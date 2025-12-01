import { prisma } from "@/lib/db";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export type CreditCheckResult = {
  success: boolean;
  creditsRemaining: number;
  isPaid: boolean;
  message?: string;
};

export async function checkAndDeductCredits(
  userId: string,
  creditsToDeduct: number = 1
): Promise<CreditCheckResult> {
  if (!userId) {
    return {
      success: false,
      creditsRemaining: 0,
      isPaid: false,
      message: "User ID is required",
    };
  }

  try {
    // Get user's subscription plan to check if they're paid
    const subscriptionPlan = await getUserSubscriptionPlan(userId);
    const isPaid = subscriptionPlan.isPaid;
    const currentCredits = subscriptionPlan.credits || 0;

    // If user has a paid plan, they have unlimited credits
    if (isPaid) {
      return {
        success: true,
        creditsRemaining: -1, // -1 indicates unlimited
        isPaid: true,
      };
    }

    // For free users, check if they have enough credits
    if (currentCredits < creditsToDeduct) {
      return {
        success: false,
        creditsRemaining: currentCredits,
        isPaid: false,
        message: `Insufficient credits. You have ${currentCredits} credit${currentCredits !== 1 ? "s" : ""} remaining.`,
      };
    }

    // Deduct credits for free users
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: creditsToDeduct,
        },
      },
      select: {
        credits: true,
      },
    });

    return {
      success: true,
      creditsRemaining: updatedUser.credits,
      isPaid: false,
    };
  } catch (error) {
    console.error("Error checking/deducting credits:", error);
    return {
      success: false,
      creditsRemaining: 0,
      isPaid: false,
      message: "Error processing credits. Please try again.",
    };
  }
}

export async function getUserCredits(userId: string): Promise<{
  credits: number;
  isPaid: boolean;
}> {
  if (!userId) {
    return { credits: 0, isPaid: false };
  }

  try {
    const subscriptionPlan = await getUserSubscriptionPlan(userId);
    return {
      credits: subscriptionPlan.credits || 0,
      isPaid: subscriptionPlan.isPaid,
    };
  } catch (error) {
    console.error("Error getting user credits:", error);
    return { credits: 0, isPaid: false };
  }
}

export async function resetUserCredits(userId: string, newCredits: number = 25): Promise<boolean> {
  if (!userId) {
    return false;
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: newCredits,
      },
    });
    return true;
  } catch (error) {
    console.error("Error resetting user credits:", error);
    return false;
  }
}
