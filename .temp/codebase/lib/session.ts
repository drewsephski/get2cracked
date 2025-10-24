import "server-only";

import { cache } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/user";
import { prisma } from "@/lib/prisma";

export const getCurrentUser = cache(async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    return undefined;
  }

  // Get additional user data from database if needed
  let dbUser = await getUserById(userId);

  if (!dbUser) {
    // If user not found in DB, create them
    dbUser = await prisma.user.create({
      data: {
        id: userId,
        name: user?.firstName + " " + user?.lastName || null,
        email: user?.emailAddresses[0]?.emailAddress || null,
        image: user?.imageUrl || null,
        role: "USER",
      },
    });
  }

  return dbUser;
});