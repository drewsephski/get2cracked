import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import InfoCard from "@/components/dashboard/info-card";
import TransactionsList from "@/components/dashboard/transactions-list";

export const metadata = constructMetadata({
  title: "Admin – SaaS Starter",
  description: "Admin page for only admin management.",
});

const stats = [
  { 
    title: "Total Users",
    value: "1,234",
    change: "+12.3%",
    changeType: "increase" as const
  },
  { 
    title: "Active Subscriptions",
    value: "876",
    change: "+5.2%",
    changeType: "increase" as const
  },
  { 
    title: "Monthly Revenue",
    value: "$12,345",
    change: "-2.1%",
    changeType: "decrease" as const
  },
  { 
    title: "Active Trials",
    value: "89",
    change: "0%",
    changeType: "neutral" as const
  }
];

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Admin Panel"
        text="Access only for users with ADMIN role."
      />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <InfoCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
            />
          ))}
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
          <TransactionsList />
        </div>
      </div>
    </>
  );
}
