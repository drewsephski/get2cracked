import { FeatureLdg, InfoLdg, TestimonialType } from "types";

export const infos: InfoLdg[] = [
  {
    title: "Launch 10x Faster",
    description: "Skip months of development setup and boilerplate code. Get your SaaS to market in days, not months, with everything pre-configured and production-ready from day one.",
    image: "/getcracked.png",
    list: []
  },
  {
    title: "Save Thousands in Development Costs",
    description:
      "Why pay $50K+ for custom development when you can have a premium, enterprise-grade foundation for a fraction of the cost? Every feature is meticulously crafted and ready to deploy.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "Pre-Built Authentication",
        description: "Complete user management with Clerk, social logins, and security features ready to go.",
        icon: "settings",
      },
      {
        title: "Payment Processing",
        description: "Full Stripe integration with subscriptions, webhooks, and billing management.",
        icon: "billing",
      },
      {
        title: "Production Database",
        description: "PostgreSQL with Prisma ORM, migrations, and optimal schema for SaaS applications.",
        icon: "settings",
      },
    ],
  },
];

export const features: FeatureLdg[] = [
  {
    title: "Everything Pre-Configured",
    description:
      "Authentication, payments, database, email, and UI components - all set up and ready to customize. No configuration hell, just start building your unique features.",
    link: "/docs/configuration",
    icon: "settings",
  },
  {
    title: "Production-Ready Code",
    description:
      "Built with Next.js 15, TypeScript, and modern best practices. Your code is enterprise-ready from day one, with proper error handling, security, and performance optimization.",
    link: "/docs",
    icon: "settings",
  },
  {
    title: "Beautiful UI Components",
    description:
      "Modern, accessible design system with Shadcn/ui components. Customize the look and feel to match your brand while maintaining professional quality.",
    link: "/docs/components",
    icon: "settings",
  },
  {
    title: "Comprehensive Documentation",
    description:
      "Step-by-step guides for every feature and configuration. From setup to deployment, everything is documented so you never get stuck.",
    link: "/docs",
    icon: "bookOpen",
  },
  {
    title: "Developer Experience",
    description:
      "TypeScript, ESLint, Prettier, and modern tooling configured out of the box. Focus on building features, not fixing development environment issues.",
    link: "/docs/installation",
    icon: "settings",
  },
  {
    title: "Scalable Architecture",
    description:
      "Built for growth with serverless databases, edge deployment, and optimized performance. Handle thousands of users without infrastructure worries.",
    link: "/docs/deployment",
    icon: "arrowUpRight",
  },
];

export const testimonials: TestimonialType[] = [
  {
    name: "Sarah Chen",
    job: "Startup Founder",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    review:
      "Get Cracked saved me 3 months of development time and over $30K in developer costs. Everything was pre-configured - authentication, payments, database, email - I just customized the branding and launched. As a non-technical founder, this was exactly what I needed to get to market fast.",
  },
  {
    name: "Marcus Rodriguez",
    job: "Solo Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    review:
      "I tried building from scratch and it was a nightmare. Get Cracked had everything ready to go - Stripe integration, user management, beautiful UI components. I saved thousands and launched in weeks instead of months. The documentation was incredible too.",
  },
  {
    name: "Amanda Foster",
    job: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    review:
      "The pre-built authentication and payment systems alone saved me $15K in development costs. Everything worked perfectly out of the box. I just focused on my unique features while the boilerplate handled all the complex infrastructure. Worth every penny.",
  },
  {
    name: "David Kim",
    job: "Tech Startup CEO",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    review:
      "As a technical founder, I still chose Get Cracked because it had production-ready code with proper security, error handling, and scalability. I could have built it myself but why reinvent the wheel? Saved 2 months of development time and launched with confidence.",
  },
  {
    name: "Lisa Thompson",
    job: "Agency Owner",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    review:
      "My clients need SaaS apps fast. Get Cracked lets me deliver professional, scalable applications in weeks instead of months. The enterprise-grade architecture and beautiful UI components impress clients every time. It's become my secret weapon for rapid deployment.",
  },
  {
    name: "Ryan Patel",
    job: "Indie Developer",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    review:
      "The developer experience is incredible - TypeScript, modern tooling, comprehensive documentation. I customized the entire app in days, not weeks. The code quality is so high that I learned best practices just by reading through it. Absolutely worth the investment.",
  },
];
