// app/api/voices/route.ts
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const voices = await prisma.voice.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify({ voices }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
