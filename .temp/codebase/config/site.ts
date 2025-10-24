import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const siteConfig: SiteConfig = {
  name: "Get Cracked",
  description:
    "Launch your SaaS 10x faster with the Get Cracked Starter SaaS boilerplate template. This premium, pre-configured solution for startups, entrepreneurs, and SaaS businesses saves you thousands of dollars on developer costs, offering a robust foundation with Next.js, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui, and Stripe.",
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
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];
