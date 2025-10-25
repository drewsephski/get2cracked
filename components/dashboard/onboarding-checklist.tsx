"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  action: string;
  href: string;
  time: string;
  completed: boolean;
}

export function OnboardingChecklist() {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: "profile",
      title: "Complete Your Profile",
      description: "Add your name, email, and profile picture to personalize your experience.",
      action: "Update Profile",
      href: "/dashboard/settings",
      time: "2 min",
      completed: false,
    },
    {
      id: "explore",
      title: "Explore Dashboard",
      description: "Take a tour of your dashboard and familiarize yourself with the features.",
      action: "View Dashboard",
      href: "/dashboard",
      time: "5 min",
      completed: false,
    },
    {
      id: "ai-chat",
      title: "Try AI Chat",
      description: "Experience the power of AI by having a conversation with our chat assistant.",
      action: "Start Chat",
      href: "/dashboard/chat",
      time: "3 min",
      completed: false,
    },
    {
      id: "templates",
      title: "Browse Templates",
      description: "Check out the 50+ pre-built templates to accelerate your development.",
      action: "View Templates",
      href: "/dashboard/templates",
      time: "5 min",
      completed: false,
    },
    {
      id: "team",
      title: "Invite Team Members",
      description: "Set up team collaboration by inviting colleagues to your workspace.",
      action: "Invite Team",
      href: "/dashboard/team",
      time: "3 min",
      completed: false,
    },
    {
      id: "billing",
      title: "Set Up Billing",
      description: "Configure your subscription and payment method to unlock all features.",
      action: "Manage Billing",
      href: "/dashboard/billing",
      time: "2 min",
      completed: false,
    },
    {
      id: "deploy",
      title: "Deploy to Production",
      description: "Launch your SaaS application using our deployment guides.",
      action: "Deploy Now",
      href: "/docs/deployment",
      time: "30 min",
      completed: false,
    },
  ]);

  const toggleItem = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = checklistItems.filter(item => item.completed).length;
  const progress = (completedCount / checklistItems.length) * 100;

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Welcome to Get Cracked! 🎉</CardTitle>
            <CardDescription>
              Complete these steps to get the most out of your SaaS boilerplate
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{completedCount}/{checklistItems.length}</div>
            <div className="text-sm text-muted-foreground">completed</div>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checklistItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-start space-x-3 rounded-lg border p-4 transition-colors ${
                item.completed
                  ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                  : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
              }`}
            >
              <Checkbox
                checked={item.completed}
                onCheckedChange={() => toggleItem(item.id)}
                className="mt-1"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${item.completed ? "text-muted-foreground line-through" : ""}`}>
                    {item.title}
                  </h4>
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-muted-foreground dark:bg-gray-700">
                    {item.time}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${item.completed ? "text-muted-foreground" : "text-gray-600 dark:text-gray-300"}`}>
                  {item.description}
                </p>
                {!item.completed && (
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <a href={item.href}>{item.action}</a>
                  </Button>
                )}
              </div>
              {item.completed && (
                <Check className="size-5 text-green-600 dark:text-green-400" />
              )}
            </div>
          ))}
        </div>

        {completedCount === checklistItems.length && (
          <div className="mt-6 rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-4 text-center dark:border-green-800 dark:from-green-950/20 dark:to-blue-950/20">
            <div className="mb-2 text-2xl">🎊</div>
            <h3 className="font-semibold text-green-700 dark:text-green-300">Congratulations!</h3>
            <p className="mt-1 text-sm text-green-600 dark:text-green-400">
              You&apos;ve completed your onboarding! You&apos;re ready to build something amazing.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
