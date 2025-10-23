import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const content = await prisma.content.findMany();
    return NextResponse.json(content);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, content, slug, status } = await req.json();

    if (!title || !content || !slug) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newContent = await prisma.content.create({
      data: {
        title,
        content,
        slug,
        status,
        authorId: user.id,
      },
    });

    return NextResponse.json(newContent);
  } catch (error) {
    console.error("[CONTENT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}