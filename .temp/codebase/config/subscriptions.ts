import { PlansRow, SubscriptionPlan } from "types";
import { env } from "@/env.mjs";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "Free demo to explore the platform's core features.",
    benefits: [
      "Explore boilerplate features",
      "Understand basic functionality",
      "Experience limited AI credits",
    ],
    limitations: [
      "No codebase access",
      "Limited AI features",
      "Community support only",
      "No custom branding",
      "Basic functionality only",
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
  "enterprise",
] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: "Complete SaaS Codebase",
    starter: "No",
    pro: "Next.js, Prisma, Stripe, Clerk",
    business: "Next.js, Prisma, Stripe, Clerk",
    enterprise: "Custom (incl. custom modules)",
    tooltip: "Full production-ready codebase with Next.js, Prisma, Stripe, Clerk.",
  },
  {
    feature: "AI Chat Interface",
    starter: "Not available",
    pro: "Not available (raw SDK access)",
    business: "Pre-built AI chat interface",
    enterprise: "Custom (incl. advanced AI models)",
    tooltip: "Preconfigured AI chat interface with OpenRouter.",
  },
  {
    feature: "Text-to-Speech",
    starter: "Not available",
    pro: "Not available",
    business: "Yes",
    enterprise: "Custom",
    tooltip: "Built-in text-to-speech functionality.",
  },
  {
    feature: "Advanced AI Components",
    starter: "Not available",
    pro: "Not available (raw SDK access)",
    business: "Bundled AI UI components (chat, content management)",
    enterprise: "Custom (incl. custom AI components)",
    tooltip: "Pre-built AI elements, chat UI, and content management.",
  },
  {
    feature: "Codebase Customization",
    starter: "No (demo sandbox)",
    pro: "Full Access (Next.js, Prisma, Stripe, Clerk)",
    business: "Full Access (Next.js, Prisma, Stripe, Clerk, AI)",
    enterprise: "Custom",
    tooltip: "Complete source code access to modify and extend.",
  },
  {
    feature: "Monthly Active Users",
    starter: "100 MAU",
    pro: "1,000 MAU",
    business: "5,000 MAU",
    enterprise: "Unlimited MAU",
    tooltip: "Monthly active users supported.",
  },
  {
    feature: "Priority Support",
    starter: "Community Forum",
    pro: "Email Support",
    business: "Priority Email & Chat",
    enterprise: "24/7 Phone & Dedicated Manager",
  },
  {
    feature: "Onboarding",
    starter: "Self-service Guides",
    pro: "Comprehensive Documentation",
    business: "Personalized Onboarding",
    enterprise: "Dedicated Account Manager",
    tooltip: "Onboarding and setup assistance.",
  },
  {
    feature: "Custom Integrations",
    starter: "No",
    pro: "Basic (API access)",
    business: "Advanced (Pre-configured AI providers)",
    enterprise: "Full API Access",
    tooltip: "Third-party services and APIs integration.",
  },
  {
    feature: "Advanced Analytics",
    starter: "Basic Metrics",
    pro: "Standard Reporting",
    business: "Enhanced Analytics & Insights",
    enterprise: "Custom Reports & Integrations",
    tooltip: "Analytics and reporting features.",
  },
  {
    feature: "Deployment Ready",
    starter: "No",
    pro: "Self-deploy (full source code)",
    business: "Production Ready (pre-configured)",
    enterprise: "White-label & Custom Deployment",
    tooltip: "Production deployment timeline.",
  },
  {
    feature: "Multi-tenant Support",
    starter: "No",
    pro: "No",
    business: "Yes",
    enterprise: "Advanced (multi-region, custom)",
    tooltip: "Multi-organization/tenant support.",
  },
];
