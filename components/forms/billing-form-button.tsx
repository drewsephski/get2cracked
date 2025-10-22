"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { generateUserStripe } from "@/actions/generate-user-stripe";
import { SubscriptionPlan, UserSubscriptionPlan } from "@/types";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

interface BillingFormButtonProps {
  offer: SubscriptionPlan;
  subscriptionPlan: UserSubscriptionPlan;
  year: boolean;
}

export function BillingFormButton({
  year,
  offer,
  subscriptionPlan,
}: BillingFormButtonProps) {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  const stripeSessionAction = () =>
    startTransition(async () => {
      const priceId = offer.stripeIds[year ? "yearly" : "monthly"];

      if (!priceId) {
        return;
      }

      const response = await generateUserStripe(priceId);

      if (response.status === "success" && response.stripeUrl) {
        router.push(response.stripeUrl);
      }
    });

  const userOffer =
    subscriptionPlan.stripePriceId &&
    subscriptionPlan.stripePriceId === offer.stripeIds[year ? "yearly" : "monthly"];

  return (
    <Button
      variant={userOffer ? "default" : "outline"}
      rounded="full"
      className="w-full"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Icons.spinner className="mr-2 size-4 animate-spin" /> Loading...
        </>
      ) : (
        <>{userOffer ? "Manage Subscription" : "Upgrade"}</>
      )}
    </Button>
  );
}
