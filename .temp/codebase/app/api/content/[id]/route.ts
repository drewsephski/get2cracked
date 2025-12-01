import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const content = await prisma.content.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(content);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, content, slug, status } = await req.json();

    if (!title || !content || !slug) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updatedContent = await prisma.content.update({
      where: {
        id: params.id,
        authorId: user.id,
      },
      data: {
        title,
        content,
        slug,
        status,
      },
    });

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error("[CONTENT_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.content.delete({
      where: {
        id: params.id,
        authorId: user.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[CONTENT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}