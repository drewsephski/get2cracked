import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";

export async function DELETE() {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response("Not authenticated", { status: 401 });
    }

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return new Response("User deleted successfully!", { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
