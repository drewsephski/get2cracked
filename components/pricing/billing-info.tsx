import Link from "next/link";
import * as React from "react";

import { CustomerPortalButton } from "@/components/forms/customer-portal-button";
import { CreditBadge } from "@/components/ui/credit-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { UserSubscriptionPlan } from "types";

interface BillingInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  userSubscriptionPlan: UserSubscriptionPlan;
}

export function BillingInfo({ userSubscriptionPlan }: BillingInfoProps) {
  const {
    title,
    description,
    stripeCustomerId,
    isPaid,
    isCanceled,
    stripeCurrentPeriodEnd,
    credits,
  } = userSubscriptionPlan;

  const isFreePlan = !isPaid && title === "Starter";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Subscription Plan
              <CreditBadge credits={credits || 0} isPaid={isPaid} />
            </CardTitle>
            <CardDescription>
              You are currently on the <strong>{title}</strong> plan.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>{description}</div>

        {isFreePlan && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
            <div className="flex items-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">💡</span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Ready to unlock more?
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Upgrade to get unlimited AI chat and text-to-speech, plus the complete codebase with advanced features.
                </p>
              </div>
            </div>
          </div>
        )}

        {isPaid && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
            <div className="flex items-start gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-sm font-semibold text-green-600 dark:text-green-300">✨</span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-green-900 dark:text-green-100">
                  You&apos;re all set!
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Enjoy unlimited access to all AI features and premium support.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2 border-t bg-accent py-2 md:flex-row md:justify-between md:space-y-0">
        {isPaid ? (
          <p className="text-sm font-medium text-muted-foreground">
            {isCanceled
              ? "Your plan will be canceled on "
              : "Your plan renews on "}
            {formatDate(stripeCurrentPeriodEnd)}.
          </p>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            <p className="text-sm font-medium text-muted-foreground">
              {credits && credits > 0
                ? `${credits} credit${credits !== 1 ? "s" : ""} remaining`
                : "No credits remaining"}
            </p>
            {credits && credits <= 1 && (
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Upgrade now to continue using AI features
              </p>
            )}
          </div>
        )}

        {isPaid && stripeCustomerId ? (
          <CustomerPortalButton userStripeId={stripeCustomerId} />
        ) : (
          <Link href="/pricing" className={cn(buttonVariants())}>
            {isFreePlan ? "Upgrade Plan" : "Choose a plan"}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
