import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { AddContentDialog } from "@/components/content/add-content-dialog";
import { Card } from "@/components/ui/card";
import { OnboardingChecklist } from "@/components/dashboard/onboarding-checklist";
import InfoCard from "@/components/dashboard/info-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Dashboard – SaaS Starter",
  description: "Create and manage content.",
});

interface Content {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/content`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  let contents: Content[] = [];
  if (response.ok) {
    contents = await response.json();
  }

  // Check if user is new (created within last 7 days)
  const isNewUser = user && new Date(user.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const quickActions = [
    {
      title: "Start AI Chat",
      description: "Experience our AI assistant",
      href: "/dashboard/chat",
      icon: "messages",
    },
    {
      title: "Browse Templates",
      description: "Explore 50+ pre-built templates",
      href: "/dashboard/templates",
      icon: "page",
    },
    {
      title: "Invite Team",
      description: "Set up team collaboration",
      href: "/dashboard/team",
      icon: "user",
    },
    {
      title: "View Analytics",
      description: "Check your performance metrics",
      href: "/dashboard/analytics",
      icon: "lineChart",
    },
  ];

  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text={`Welcome back, ${user?.name?.split(' ')[0] || 'there'}! 🎉`}
      >
        <AddContentDialog />
      </DashboardHeader>

      <div className="space-y-8">
        {/* Onboarding Checklist for New Users */}
        {isNewUser && (
          <OnboardingChecklist />
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Card key={action.href} className="p-4 transition-shadow hover:shadow-lg">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📋</div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {action.description}
                    </p>
                    <Button size="sm" variant="outline" asChild className="w-full">
                      <Link href={action.href}>Get Started</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Overview</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              title="Credits Remaining"
              value={user?.credits?.toString() || "25"}
              change=""
              changeType="neutral"
            />
            <InfoCard
              title="AI Chats"
              value="0"
              change=""
              changeType="neutral"
            />
            <InfoCard
              title="Content Created"
              value={contents.length.toString()}
              change=""
              changeType="neutral"
            />
            <InfoCard
              title="Team Members"
              value="1"
              change=""
              changeType="neutral"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Recent Activity</h2>
          {contents.length === 0 ? (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>No recent activity</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Start creating content or exploring features to see your activity here.
              </EmptyPlaceholder.Description>
              <AddContentDialog />
            </EmptyPlaceholder>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {contents.slice(0, 6).map((item) => (
                <Card key={item.id} className="p-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="line-clamp-2 text-sm text-gray-500">{item.content}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* What's New */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">What&apos;s New</h2>
          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🆕</div>
              <div>
                <h3 className="mb-2 font-semibold">New Features Available!</h3>
                <p className="mb-4 text-muted-foreground">
                  Check out our latest features including team collaboration, referral program,
                  advanced analytics, and 50+ page templates.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/changelog">View Changelog</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
