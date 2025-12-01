import { PlansRow, SubscriptionPlan } from "types";
import { env } from "@/env.mjs";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "Free demo to explore the platform's core features.",
    benefits: [
      "25 AI credits for meaningful testing",
      "Full dashboard access",
      "Community support",
    ],
    limitations: [
      "Limited AI features",
      "No team collaboration",
      "No referral program",
      "Basic analytics only",
      "Community support only",
    ],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: "Pro",
    description: "Complete codebase access for developers ready to build.",
    benefits: [
      "Complete production-ready codebase",
      "AI SDK access for custom integrations",
      "Full source code access",
      "Deploy to production in minutes",
      "Email support & docs",
      "Customize and extend as needed",
    ],
    limitations: [
      "No pre-built AI components",
      "No preconfigured AI providers",
      "Self-service deployment only",
      "Raw SDK access only",
    ],
    prices: {
      monthly: 15,
      yearly: 144,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Business",
    description: "AI-powered solution with pre-built components, ready to deploy.",
    benefits: [
      "Everything in Pro, plus:",
      "Pre-built AI UI components (chat interfaces)",
      "Preconfigured AI providers (OpenRouter, OpenAI)",
      "Advanced AI elements and components",
      "Built-in text-to-speech",
      "Production-ready AI deployment",
      "Personalized onboarding",
      "Priority support",
      "Referral system",
      "Advanced analytics dashboard",
      "Email marketing tools",
    ],
    limitations: [],
    prices: {
      monthly: 30,
      yearly: 300,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
];

export const plansColumns = [
  "starter",
  "pro",
  "business",
] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: "Complete SaaS Codebase",
    starter: "No",
    pro: "Next.js, Prisma, Stripe, Clerk",
    business: "Next.js, Prisma, Stripe, Clerk",
    tooltip: "Full production-ready codebase with Next.js, Prisma, Stripe, Clerk.",
  },
  {
    feature: "AI Chat Interface",
    starter: "Not available",
    pro: "Not available (raw SDK access)",
    business: "Pre-built AI chat interface",
    tooltip: "Preconfigured AI chat interface with OpenRouter.",
  },
  {
    feature: "Text-to-Speech",
    starter: "Not available",
    pro: "Not available",
    business: "Yes",
    tooltip: "Built-in text-to-speech functionality.",
  },
  {
    feature: "Advanced AI Components",
    starter: "Not available",
    pro: "Not available (raw SDK access)",
    business: "Bundled AI UI components (chat, content management)",
    tooltip: "Pre-built AI elements, chat UI, and content management.",
  },
  {
    feature: "Codebase Customization",
    starter: "No (demo sandbox)",
    pro: "Full Access (Next.js, Prisma, Stripe, Clerk)",
    business: "Full Access (Next.js, Prisma, Stripe, Clerk, AI)",
    tooltip: "Complete source code access to modify and extend.",
  },
  {
    feature: "White-label Branding",
    starter: "No",
    pro: "No",
    business: "No",
    tooltip: "White-label branding options.",
  },
  {
    feature: "Referral System",
    starter: "No",
    pro: "No",
    business: "Yes",
    tooltip: "Built-in referral tracking and rewards.",
  },
  {
    feature: "Advanced Analytics Dashboard",
    starter: "Basic",
    pro: "Standard",
    business: "Yes",
    tooltip: "Advanced analytics and reporting.",
  },
  {
    feature: "Priority Support",
    starter: "Community Forum",
    pro: "Email Support",
    business: "Priority Email & Chat",
    tooltip: "Onboarding and setup assistance.",
  },
  {
    feature: "Onboarding",
    starter: "Self-service Guides",
    pro: "Comprehensive Documentation",
    business: "Personalized Onboarding",
    tooltip: "Onboarding and setup assistance.",
  },
  {
    feature: "Deployment Ready",
    starter: "No",
    pro: "Self-deploy (full source code)",
    business: "Production Ready (pre-configured)",
    tooltip: "Production deployment timeline.",
  },
  {
    feature: "Multi-tenant Support",
    starter: "No",
    pro: "No",
    business: "Yes",
    tooltip: "Multi-organization/tenant support.",
  },
];
