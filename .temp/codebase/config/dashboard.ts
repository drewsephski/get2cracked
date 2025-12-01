import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin",
        icon: "laptop",
        title: "Admin Panel",
        authorizeOnly: UserRole.ADMIN,
      },
      { href: "/dashboard", icon: "dashboard", title: "Dashboard" },
      { href: "/dashboard/chat", icon: "messages", title: "AI Chat" },
      {
        href: "/dashboard/billing",
        icon: "billing",
        title: "Billing",
        authorizeOnly: UserRole.USER,
      },
      { href: "/dashboard/charts", icon: "lineChart", title: "Charts" },
      { href: "/dashboard/tts", icon: "media", title: "Text to Speech" },
      {
        href: "/dashboard/team",
        icon: "user",
        title: "Team",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/analytics",
        icon: "lineChart",
        title: "Analytics",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/referrals",
        icon: "package",
        title: "Referrals",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/api",
        icon: "settings",
        title: "API Keys",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/webhooks",
        icon: "settings",
        title: "Webhooks",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/emails",
        icon: "messages",
        title: "Email Campaigns",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/templates",
        icon: "page",
        title: "Templates",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/integrations",
        icon: "settings",
        title: "Integrations",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/admin/orders",
        icon: "package",
        title: "Orders",
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "#/dashboard/posts",
        icon: "post",
        title: "User Posts",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      { href: "/", icon: "home", title: "Homepage" },
      { href: "/docs", icon: "bookOpen", title: "Documentation" },
      { href: "/docs/api", icon: "settings", title: "API Docs" },
      { href: "/integrations", icon: "settings", title: "Integrations" },
      { href: "/changelog", icon: "page", title: "Changelog" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
