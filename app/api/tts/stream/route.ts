// app/api/tts/stream/route.ts
import { NextRequest } from "next/server";
import { hume } from "@/lib/hume";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      text,
      voice = { name: "Ava Song", provider: "HUME_AI" as const },
      description,
      continueGenerationId,
      format = "wav", // 'wav' or 'pcm'
      instantMode = false,
    } = body as {
      text: string;
      voice?: { name: string; provider?: "HUME_AI" | "CUSTOM_VOICE" };
      description?: string;
      continueGenerationId?: string;
      format?: "wav" | "pcm";
      instantMode?: boolean;
    };

    if (!text || typeof text !== "string" || text.length > 8000) {
      return new Response(JSON.stringify({ error: "Text is required and must be <= 8000 characters." }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const synthOpts: Parameters<typeof hume.tts.synthesizeJsonStreaming>[0] = {
      utterances: [
        {
          text,
          voice,
          ...(description ? { description } : {}),
        },
      ],
      ...(continueGenerationId ? { context: { generationId: continueGenerationId } } : {}),
      stripHeaders: true,
      version: "2",
      ...(format === "pcm" ? { formatType: "pcm" as const } : {}),
      ...(instantMode ? { instantMode: true } : {}),
    };

    const stream = await hume.tts.synthesizeJsonStreaming(synthOpts);
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === "audio") {
              const line = JSON.stringify({ type: "audio", audio: chunk.audio });
              controller.enqueue(encoder.encode(line + "\n"));
            } else {
              controller.enqueue(encoder.encode(JSON.stringify({ type: chunk.type }) + "\n"));
            }
          }
        } catch (e) {
          controller.enqueue(encoder.encode(JSON.stringify({ type: "error", error: String(e) }) + "\n"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      status: 200,
      headers: {
        "content-type": "application/x-ndjson",
        "cache-control": "no-cache",
        "transfer-encoding": "chunked",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
