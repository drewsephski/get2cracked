import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { checkAndDeductCredits } from "@/lib/credits";

export async function GET() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const subscriptionPlan = await import("@/lib/subscription").then(
      (mod) => mod.getUserSubscriptionPlan(user.id)
    );

    return new Response(JSON.stringify({
      credits: subscriptionPlan.credits || 0,
      isPaid: subscriptionPlan.isPaid,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching user credits:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch credits' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
