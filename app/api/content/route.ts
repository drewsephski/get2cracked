import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const json = await req.json();
    const { title, content, status } = json;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

    console.log('User object:', user);

    const newContent = await prisma.content.create({
      data: {
        title,
        content,
        slug,
        status: status || 'DRAFT',
        authorId: user.id,
      },
    });
    console.log('Prisma create result:', newContent);

    revalidatePath('/dashboard');
    return NextResponse.json(newContent, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const userContent = await prisma.content.findMany({
      where: {
        authorId: user.id,
      },
    });

    return NextResponse.json(userContent, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}