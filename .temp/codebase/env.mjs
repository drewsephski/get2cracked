import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Helper function to create optional string with empty default
const optionalString = () => z.string().min(1, { message: "Required" }).default("");

export const env = createEnv({
  server: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1, "Clerk publishable key is required"),
    CLERK_SECRET_KEY: z.string().min(1, "Clerk secret key is required"),
    DATABASE_URL: z.string().url().default('postgresql://postgres:postgres@localhost:5432/saas-starter'),
    RESEND_API_KEY: optionalString(),
    EMAIL_FROM: z.string().email().default('noreply@localhost'),
    STRIPE_API_KEY: optionalString(),
    STRIPE_WEBHOOK_SECRET: optionalString(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default('https://get2cracked.netlify.app'),
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID: optionalString(),
    NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID: optionalString(),
    NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID: optionalString(),
    NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID: optionalString(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
  },
  skipValidation: process.env.NODE_ENV === 'development', // Only skip validation in development
});