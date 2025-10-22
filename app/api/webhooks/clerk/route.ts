import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { data, type } = payload;

    // Handle user creation
    if (type === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } = data;

      const primaryEmail = email_addresses?.[0]?.email_address;

      if (!primaryEmail) {
        return new Response("No email address found", { status: 400 });
      }

      // Create user in database
      const user = await prisma.user.create({
        data: {
          id,
          email: primaryEmail,
          name: [first_name, last_name].filter(Boolean).join(" ") || null,
          image: image_url || null,
          role: "USER",
        },
      });

      return new Response(JSON.stringify({ user }), { status: 200 });
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
