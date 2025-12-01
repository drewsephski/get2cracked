"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { openCustomerPortal } from "@/actions/open-customer-portal";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

interface CustomerPortalButtonProps {
  userStripeId: string;
}

export function CustomerPortalButton({
  userStripeId,
}: CustomerPortalButtonProps) {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  const stripeSessionAction = () =>
    startTransition(async () => {
      const response = await openCustomerPortal(userStripeId);

      if (response.status === "success" && response.stripeUrl) {
        router.push(response.stripeUrl);
      }
    });

  return (
    <Button disabled={isPending} onClick={stripeSessionAction}>
      {isPending ? (
        <Icons.spinner className="mr-2 size-4 animate-spin" />
      ) : null}
      Open Customer Portal
    </Button>
  );
}
