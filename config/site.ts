import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const siteConfig: SiteConfig = {
  name: "Get Cracked",
  description:
    "Launch your SaaS 10x faster with the Get Cracked Starter SaaS boilerplate template. This premium, pre-configured solution for startups, entrepreneurs, and SaaS businesses saves you $75K+ in developer costs, offering a robust foundation with Next.js, Prisma, Stripe, Clerk, team collaboration, referral system, advanced analytics, API access, email marketing tools, and 50+ pre-built components. Save 6+ months of development time with everything production-ready from day one.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    instagram: "https://instagram.com/drew.sepeczi",
    github: "https://github.com/drewsephski/getcracked",
  },
  mailSupport: "support@drewsepeczi@gmail.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Enterprise", href: "#" },
      { title: "Case Studies", href: "/case-studies" },
      { title: "Affiliate Program", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Integrations", href: "/integrations" },
      { title: "Demo", href: "/demo" },
      { title: "Roadmap", href: "#" },
      { title: "Changelog", href: "/changelog" },
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "API Documentation", href: "/docs/api" },
      { title: "Deployment", href: "/docs/deployment" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];
