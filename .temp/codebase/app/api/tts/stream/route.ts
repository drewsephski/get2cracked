// app/api/tts/stream/route.ts
import { NextRequest } from "next/server";
import { hume } from "@/lib/hume";
import { getCurrentUser } from '@/lib/session';
import { checkAndDeductCredits } from '@/lib/credits';

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Get current user
  const user = await getCurrentUser();

  if (!user?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check and deduct credits for free users
  const creditCheck = await checkAndDeductCredits(user.id, 1);

  if (!creditCheck.success) {
    return new Response(JSON.stringify({
      error: creditCheck.message || 'Insufficient credits to use text-to-speech'
    }), {
      status: 402, // Payment Required
      headers: { 'Content-Type': 'application/json' },
    });
  }

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
