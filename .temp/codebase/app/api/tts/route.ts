import { NextResponse } from "next/server";
import { hume } from "@/lib/hume";

export async function POST(request: Request) {
  try {
    const { text, voice } = await request.json();

    const ttsStream = await hume.tts.synthesizeFileStreaming({
      utterances: [
        {
          text,
          voice: {
            name: voice.name,
            provider: voice.provider || "HUME_AI",
          },
        },
      ],
    });

    if (!ttsStream) {
      return NextResponse.json(
        { error: "Failed to generate audio stream." },
        { status: 500 },
      );
    }

    // Return the streaming response
    return new Response(ttsStream as any, {
      headers: {
        "Content-Type": "audio/wav",
      },
    });
  } catch (error) {
    console.error("TTS route error:", error);
    return NextResponse.json(
      {
        error: `Internal server error: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    );
  }
}
