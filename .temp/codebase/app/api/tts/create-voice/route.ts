// app/api/tts/create-voice/route.ts
import { NextRequest } from "next/server";
import { hume } from "@/lib/hume";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      description,
      sampleText,
      voiceNamePrefix = "custom-voice",
      sampleIndex = 1,
      numGenerations = 2,
      notes,
    } = body as {
      description: string;
      sampleText: string;
      voiceNamePrefix?: string;
      sampleIndex?: number;
      numGenerations?: number;
      notes?: string;
    };

    if (!description || !sampleText) {
      return new Response(JSON.stringify({ error: "description and sampleText are required." }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const gen = await hume.tts.synthesizeJson({
      utterances: [{ description, text: sampleText }],
      numGenerations,
      stripHeaders: true,
    });

    if (!gen.generations?.length || sampleIndex < 0 || sampleIndex >= gen.generations.length) {
      return new Response(JSON.stringify({ error: "Invalid generation index." }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const selected = gen.generations[sampleIndex];
    const voiceName = `${voiceNamePrefix}-${Date.now()}`;

    await hume.tts.voices.create({
      name: voiceName,
      generationId: selected.generationId,
    });

    // Persist in DB
    await prisma.voice.create({
      data: {
        name: voiceName,
        provider: "CUSTOM_VOICE",
        generationId: selected.generationId,
        description: notes ?? description,
      },
    });

    return new Response(
      JSON.stringify({
        voiceName,
        generationId: selected.generationId,
        provider: "CUSTOM_VOICE",
        message: "Voice created and saved.",
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
