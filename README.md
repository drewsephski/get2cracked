<a href="https://next-saas-stripe-starter.vercel.app">
  <img alt="Get Cracked" src="public/_static/og.jpg">
  <h1 align="center">Get Cracked Starter</h1>
</a>

<p align="center">
  Start at full speed with Get Cracked !
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#tech-stack--features"><strong>Tech Stack + Features</strong></a> ·
  <a href="#author"><strong>Author</strong></a>
</p>
<br/>

## Introduction

Empower your next project with the stack of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui, and Stripe.
<br/>
All seamlessly integrated with the Get Cracked starter to accelerate your development and saas journey.

## Installation

Clone & create this repo locally with the following command:

```bash
npx create-next-app my-get-cracked-project --example "https://github.com/drewsephski/get2cracked"
```

Or, deploy with Vercel:z

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdrewsephski%2Fget2cracked)

### Steps

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
pnpm run dev
```

> [!NOTE]  
> I use [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) package for update this project.
>
> Use this command for update your project: `ncu -i --format group`

## Deploy to Netlify

Your application is configured for Netlify deployment. Here's how to deploy and set up webhooks:

### 1. Deploy Application

**Option A: Netlify CLI (Recommended)**
```bash
# Install Netlify CLI
pnpm add -D netlify-cli

# Check deployment readiness
pnpm run deploy:check

# Login to Netlify
pnpm netlify login

# Deploy to production
pnpm run deploy:netlify

# Or deploy preview
pnpm run deploy:netlify:preview
```

**Option B: Manual Deployment**
1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to [Netlify](https://netlify.com)
3. Netlify will auto-detect Next.js and deploy

### 2. Set Environment Variables

In Netlify Dashboard:
1. Go to **Site Settings** → **Environment Variables**
2. Add your production variables:

```bash
# Required for production
STRIPE_API_KEY="sk_live_..."  # Your restricted live key
STRIPE_WEBHOOK_SECRET="whsec_..."  # Your live webhook secret
DATABASE_URL="your_production_db_url"

# Clerk Production Keys (REQUIRED)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."  # Your production publishable key
CLERK_SECRET_KEY="sk_live_..."  # Your production secret key

# Application URL (REQUIRED for production)
NEXT_PUBLIC_APP_URL="https://yourdomain.com"  # Your production domain

# ... other production variables
```

## 🚀 Clerk Production Deployment

**IMPORTANT**: Before deploying to production, you must configure Clerk for production use. This ensures security and proper authentication functionality.

### 1. Create Production Instance

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click **Development** → **Create production instance**
3. Choose to **clone your development settings** (recommended)
4. Your production instance will be created with a new set of API keys

### 2. Update API Keys

Replace your development keys with production keys:

- **Development**: `pk_test_...` → `pk_live_...`
- **Development**: `sk_test_...` → `sk_live_...`

**⚠️ CRITICAL**: Never use test keys (`pk_test_`, `sk_test_`) in production!

### 3. Configure OAuth for Production

1. In Clerk Dashboard, go to **Authentication** → **Social providers**
2. For each OAuth provider (Google, GitHub, etc.):
   - Create OAuth applications in respective provider dashboards
   - Use your **production domain** as the redirect URL
   - Copy credentials to Clerk Dashboard

**Note**: Clerk's shared OAuth credentials only work in development. Production requires your own OAuth apps.

### 4. Update Webhooks (If Using)

1. In Clerk Dashboard, go to **Webhooks**
2. Update webhook endpoints to use your production domain
3. Copy the new production signing secret to your environment variables

### 5. DNS Configuration

1. In Clerk Dashboard, go to **Domains**
2. Add your production domain
3. Clerk will show required DNS records
4. Add these records to your DNS provider
5. **Wait up to 48 hours** for DNS propagation

### 6. Security Configuration

Your middleware is pre-configured with `authorizedParties` for enhanced security:

```typescript
// middleware.ts - Automatically configured
clerkMiddleware({
  authorizedParties: process.env.NODE_ENV === 'production'
    ? [new URL(process.env.NEXT_PUBLIC_APP_URL).host]
    : undefined
})
```

This prevents subdomain cookie leaking attacks in production.

### 7. Deploy Certificates

1. In Clerk Dashboard, complete all required steps
2. Click **Deploy certificates** when it appears
3. Clerk will provision SSL certificates for your domain

### 8. Verify Deployment

Run the deployment helper to verify everything is configured:

```bash
pnpm run deploy:check
```

This script validates:
- ✅ Environment variables are set
- ✅ Using production Clerk keys (not test keys)
- ✅ Production domain is configured
- ✅ Webhook endpoints are updated
- ✅ All deployment prerequisites

### Troubleshooting

**Common Issues:**
- **Invalid keys**: Ensure you're using `pk_live_` and `sk_live_` (not `pk_test_` or `sk_test_`)
- **OAuth failures**: Verify OAuth credentials are set up for your production domain
- **DNS issues**: DNS propagation can take up to 48 hours
- **Domain verification**: Ensure your domain is properly verified in Clerk Dashboard

**Debug Steps:**
1. Check Clerk Dashboard for error messages
2. Verify environment variables in Netlify
3. Test authentication flows in production
4. Check browser console for any errors

### 3. Configure Stripe Webhook

1. **Get your Netlify URL**: After deployment, note your site's URL (e.g., `https://your-site.netlify.app`)
2. **Go to Stripe Dashboard** → **Developers** → **Webhooks**
3. **Add new endpoint**: `https://your-site.netlify.app/api/webhooks/stripe`
4. **Select events**:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. **Copy webhook secret** and add to Netlify environment variables

### 4. Test Webhook

1. Deploy with live environment variables
2. Make a test purchase to verify webhook works
3. Check **Stripe Dashboard** → **Developers** → **Webhook logs**
4. Verify events are processed correctly

### 5. Domain Setup (Optional)

For production domain:
1. **Netlify**: Add custom domain in site settings
2. **DNS**: Point your domain to Netlify nameservers
3. **SSL**: Netlify provides free SSL certificates

### Webhook Events Handled

Your webhook handler processes these Stripe events:
- ✅ **checkout.session.completed**: Creates user subscription
- ✅ **invoice.payment_succeeded**: Updates subscription on renewal
- ✅ **customer.subscription.updated**: Handles plan changes
- ✅ **customer.subscription.deleted**: Handles cancellations

### Troubleshooting Webhooks

**Common Issues:**
1. **404 errors**: Ensure webhook URL is correct and app is deployed
2. **Signature errors**: Verify webhook secret matches in both Stripe and Netlify
3. **Environment mismatch**: Ensure you're using live keys and secrets in production

**Debug Steps:**
1. Check Netlify function logs
2. Verify environment variables are set correctly
3. Test with Stripe CLI: `stripe listen --forward-to your-netlify-url/api/webhooks/stripe`

## Roadmap
- [ ] Upgrade eslint to v9
- [ ] Add resend for success subscriptions

## Tech Stack + Features

https://github.com/mickasmt/next-saas-stripe-starter/assets/62285783/828a4e0f-30e3-4cfe-96ff-4dfd9cd55124

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience
- [Prisma](https://www.prisma.io/) – Typescript-first ORM for Node.js
- [React Email](https://react.email/) – Versatile email framework for efficient and flexible email development

### Platforms

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git
- [Resend](https://resend.com/) – A powerful email framework for streamlined email development
- [Neon](https://neon.tech/) – Serverless Postgres with autoscaling, branching, bottomless storage and generous free tier.

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Shadcn/ui](https://ui.shadcn.com/) – Re-usable components built using Radix UI and Tailwind CSS
- [Framer Motion](https://framer.com/motion) – Motion library for React to animate components with ease
- [Lucide](https://lucide.dev/) – Beautifully simple, pixel-perfect icons
- [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) – Optimize custom fonts and remove external network requests for improved performance
- [`ImageResponse`](https://nextjs.org/docs/app/api-reference/functions/image-response) – Generate dynamic Open Graph images at the edge

### Hooks and Utilities

- `useIntersectionObserver` – React hook to observe when an element enters or leaves the viewport
- `useLocalStorage` – Persist data in the browser's local storage
- `useScroll` – React hook to observe scroll position ([example](https://github.com/mickasmt/precedent/blob/main/components/layout/navbar.tsx#L12))
- `nFormatter` – Format numbers with suffixes like `1.2k` or `1.2M`
- `capitalize` – Capitalize the first letter of a string
- `truncate` – Truncate a string to a specified length
- [`use-debounce`](https://www.npmjs.com/package/use-debounce) – Debounce a function call / state update

### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

### Miscellaneous

- [Vercel Analytics](https://vercel.com/analytics) – Track unique visitors, pageviews, and more in a privacy-friendly way

## Author

Created by [@drewsephski](https://github.com/drewsephski)
