import "server-only";

import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/user";

export const getCurrentUser = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return undefined;
  }

  // Get additional user data from database if needed
  const user = await getUserById(userId);

  if (!user) {
    return undefined;
  }

  return user;
});