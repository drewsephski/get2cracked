"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";
import { revalidatePath } from "next/cache";

export type FormData = {
  name: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const user = await currentUser()

    if (!user || user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name } = userNameSchema.parse(data);

    // Update the user name.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
      },
    })

    revalidatePath('/dashboard/settings');
    return { status: "success" };
  } catch (error) {
    // console.log(error)
    return { status: "error" }
  }
}