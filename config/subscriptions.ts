import { PlansRow, SubscriptionPlan } from "types";
import { env } from "@/env.mjs";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "For Beginners",
    benefits: [
      "Access to complete documentation",
      "Community support via GitHub",
      "Basic UI components library",
      "Email templates included",
    ],
    limitations: [
      "No access to full source code",
      "No AI features included",
      "No priority support",
      "No deployment assistance",
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
    description: "Complete SaaS Codebase",
    benefits: [
      "Complete production-ready SaaS codebase",
      "Next.js, Prisma, Stripe, Clerk integration",
      "Authentication & user management system",
      "Subscription & payment processing",
      "Email system with Resend & React Email",
      "Shadcn/ui component library",
      "Blog & documentation system (MDX)",
      "Priority email support",
    ],
    limitations: [
      "AI features not preconfigured",
      "Self-service setup and deployment",
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
    description: "Codebase + AI Integration",
    benefits: [
      "Everything in Pro plan",
      "Preconfigured AI chat (GPT-4o, Deepseek R1)",
      "Text-to-Speech with Hume AI voices",
      "AI content generation system",
      "Web search integration for AI chat",
      "Advanced analytics dashboard",
      "24/7 priority support",
      "Deployment assistance & onboarding",
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
    feature: "Complete Source Code",
    starter: null,
    pro: true,
    business: true,
    enterprise: "Custom",
    tooltip: "Pro and Business plans include full access to the production-ready codebase.",
  },
  {
    feature: "AI Chat Integration",
    starter: null,
    pro: null,
    business: true,
    enterprise: true,
    tooltip: "Preconfigured AI chat with GPT-4o and Deepseek R1, including web search capability.",
  },
  {
    feature: "Database & ORM",
    starter: null,
    pro: "Available",
    business: "Available",
    enterprise: "Available",
    tooltip: "Prisma ORM with PostgreSQL database, including migrations and schema management.",
  },
  {
    feature: "Priority Support",
    starter: null,
    pro: "Email",
    business: "Email & Chat",
    enterprise: "24/7 Support",
  },
  {
    feature: "Text-to-Speech",
    starter: null,
    pro: null,
    business: true,
    enterprise: true,
    tooltip: "Preconfigured TTS with multiple AI voices for content creation and accessibility.",
  },
  {
    feature: "AI Content Generation",
    starter: null,
    pro: null,
    business: true,
    enterprise: true,
    tooltip: "Built-in AI content generation system for creating blog posts, marketing copy, and more.",
  },
  {
    feature: "Authentication System",
    starter: "Docs Only",
    pro: "Full Access",
    business: "Full Access",
    enterprise: "Full Access",
    tooltip: "Complete user authentication with Clerk, including social logins and user management.",
  },
  {
    feature: "Payment Processing",
    starter: false,
    pro: true,
    business: true,
    enterprise: true,
    tooltip: "Stripe integration with subscription management, webhooks, and billing portal.",
  },
  {
    feature: "Custom Integrations",
    starter: false,
    pro: false,
    business: "Available",
    enterprise: "Available",
    tooltip:
      "Custom integrations are available in Business and Enterprise plans.",
  },
  {
    feature: "Roles and Permissions",
    starter: null,
    pro: "Basic",
    business: "Advanced",
    enterprise: "Advanced",
    tooltip:
      "User roles and permissions management improves with higher plans.",
  },
  {
    feature: "Onboarding Assistance",
    starter: false,
    pro: "Self-service",
    business: "Assisted",
    enterprise: "Full Service",
    tooltip: "Higher plans include more comprehensive onboarding assistance.",
  },
  { 
    feature: "Email System",
    starter: "Documentation",
    pro: "Available",
    business: "Available",
    enterprise: "Available",
    tooltip: "Resend integration with React Email templates for transactional and marketing emails.",
  },
  {
    feature: "Deployment Support",
    starter: false,
    pro: "Self-service",
    business: "Assisted",
    enterprise: "Full Service",
    tooltip: "Deployment assistance and onboarding support varies by plan level.",
  },
  // Add more rows as needed
];
