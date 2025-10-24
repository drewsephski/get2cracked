import { headers } from "next/headers";
import Stripe from "stripe";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { sendCodebaseEmail } from "@/actions/send-codebase-email";

const PRO_PRICE_IDS = [
  env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
  env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
];

const BUSINESS_PRICE_IDS = [
  env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
  env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
];

const ALL_CODEBASE_PRICE_IDS = [...PRO_PRICE_IDS, ...BUSINESS_PRICE_IDS];

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    await prisma.user.update({
      where: {
        id: session?.metadata?.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });

    // Check if this is a subscription that includes codebase access
    const isProPlan = PRO_PRICE_IDS.includes(subscription.items.data[0].price.id);
    const isBusinessPlan = BUSINESS_PRICE_IDS.includes(subscription.items.data[0].price.id);
    const includesCodebase = isProPlan || isBusinessPlan;

    if (includesCodebase && session?.metadata?.userId) {
      console.log(`🎉 ${isBusinessPlan ? 'Business' : 'Pro'} plan subscription detected for user ${session.metadata.userId}`);

      try {
        // Get user details from database
        const user = await prisma.user.findUnique({
          where: { id: session.metadata.userId },
        });

        if (user) {
          // Determine plan name and features for email
          const planName = isBusinessPlan ? "Business Plan" : "Pro Plan";
          const planFeatures = isBusinessPlan
            ? "Complete SaaS starter with AI features"
            : "Complete SaaS starter template";

          // Send codebase delivery email
          const emailResult = await sendCodebaseEmail({
            customerEmail: user.email!,
            customerName: user.name || user.email!,
            planName,
            userId: user.id,
          });

          if (emailResult.success) {
            console.log(`✅ Codebase delivery email sent to ${user.email} for ${planName}`);
          } else {
            console.error(`❌ Failed to send codebase email:`, emailResult.error);
          }
        } else {
          console.error(`❌ User not found: ${session.metadata.userId}`);
        }
      } catch (error) {
        console.error(`❌ Error sending codebase email:`, error);
      }
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    const session = event.data.object as Stripe.Invoice;

    // If the billing reason is not subscription_create, it means the customer has updated their subscription.
    // If it is subscription_create, we don't need to update the subscription id and it will handle by the checkout.session.completed event.
    if (session.billing_reason != "subscription_create") {
      // Retrieve the subscription details from Stripe.
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      // Update the price id and set the new period end.
      await prisma.user.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        },
      });
    }
  }

  return new Response(null, { status: 200 });
}
