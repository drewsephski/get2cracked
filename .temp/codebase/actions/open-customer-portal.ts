"use server";

import { currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

const billingUrl = absoluteUrl("/dashboard/billing");

export async function openCustomerPortal(
  userStripeId: string,
): Promise<responseAction> {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    if (!user || !user.emailAddresses?.[0]?.emailAddress || !user.id) {
      throw new Error("Unauthorized");
    }

    if (userStripeId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userStripeId,
        return_url: billingUrl,
      });

      return {
        status: "success",
        stripeUrl: stripeSession.url as string,
      };
    }

    return { status: "error" };
  } catch (error) {
    return { status: "error" };
  }
}
