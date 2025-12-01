import { FeatureLdg, InfoLdg, TestimonialType } from "types";

export const infos: InfoLdg[] = [
  {
    title: "Launch 10x Faster",
    description: "Skip months of development setup and boilerplate code. Get your SaaS to market in days, not months, with everything pre-configured and production-ready from day one.",
    image: "/getcracked.png",
    list: []
  },
  {
    title: "Save $75K+ in Development Costs",
    description:
      "Why pay $75K+ for custom development when you can have a premium, enterprise-grade foundation for a fraction of the cost? Every feature is meticulously crafted and ready to deploy.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "Team Collaboration Built-In",
        description: "Multi-user workspaces with role-based permissions, team invitations, and collaborative features.",
        icon: "user",
      },
      {
        title: "Marketing Tools Included",
        description: "Built-in referral system, email campaigns, and SEO optimization tools.",
        icon: "messages",
      },
      {
        title: "Production Analytics",
        description: "User behavior tracking, revenue metrics, and custom dashboards for data-driven decisions.",
        icon: "lineChart",
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
    title: "Team & Workspace Management",
    description:
      "Multi-user support with role-based access control, team invitations, and collaborative features. Perfect for agencies and growing teams.",
    link: "/dashboard/team",
    icon: "user",
  },
  {
    title: "Referral & Affiliate System",
    description:
      "Built-in referral tracking, custom reward rules, and affiliate dashboard. Grow your user base organically with automated rewards.",
    link: "/dashboard/referrals",
    icon: "package",
  },
  {
    title: "Advanced Analytics Dashboard",
    description:
      "User behavior tracking, revenue metrics, conversion funnels, and custom reports. Make data-driven decisions with comprehensive insights.",
    link: "/dashboard/analytics",
    icon: "lineChart",
  },
  {
    title: "API & Webhooks",
    description:
      "RESTful API with authentication, webhook system for real-time events, and comprehensive API documentation. Integrate with any service.",
    link: "/docs/api",
    icon: "settings",
  },
  {
    title: "Email Marketing Integration",
    description:
      "Pre-built email templates, campaign management, and automated drip sequences. Nurture leads and engage users effectively.",
    link: "/dashboard/emails",
    icon: "messages",
  },
  {
    title: "50+ Page Templates",
    description:
      "Pre-built templates for landing pages, dashboards, auth pages, pricing, blog, and more. Launch faster with professional designs.",
    link: "/dashboard/templates",
    icon: "page",
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
    image: "/_static/blog/blog-post-1.jpg",
    review:
      "The team collaboration features saved us from building our own permission system from scratch. The referral program helped us grow 3x faster than expected. Get Cracked didn't just save us money - it accelerated our entire go-to-market strategy.",
  },
  {
    name: "Marcus Rodriguez",
    job: "Solo Entrepreneur",
    image: "/_static/blog/blog-post-2.jpg",
    review:
      "The built-in referral system helped us grow 10x faster than our previous manual approach. The team features let me bring on contractors without worrying about access control. Everything just worked out of the box.",
  },
  {
    name: "Amanda Foster",
    job: "Small Business Owner",
    image: "/_static/illustrations/work-from-home.jpg",
    review:
      "The pre-built authentication and payment systems alone saved me $15K in development costs. The advanced analytics dashboard gives me insights I never had before. The team collaboration tools made it easy to scale my operations.",
  },
  {
    name: "David Kim",
    job: "Tech Startup CEO",
    image: "/_static/blog/blog-post-3.jpg",
    review:
      "As a technical founder, I still chose Get Cracked because it had production-ready code with proper security, error handling, and scalability. The API access and webhook system made integrations seamless. The analytics dashboard transformed how we make product decisions.",
  },
  {
    name: "Lisa Thompson",
    job: "Agency Owner",
    image: "/_static/blog/blog-post-4.jpg",
    review:
      "My clients need SaaS apps fast. Get Cracked lets me deliver professional, scalable applications in weeks instead of months. The enterprise-grade architecture and beautiful UI components impress clients every time. The team features make client collaboration effortless.",
  },
  {
    name: "Ryan Patel",
    job: "Indie Developer",
    image: "/_static/illustrations/work-from-home.jpg",
    review:
      "The developer experience is incredible - TypeScript, modern tooling, comprehensive documentation. The 50+ templates saved me weeks of design work. The API system and webhooks made integrations a breeze. I customized the entire app in days, not weeks.",
  },
];
