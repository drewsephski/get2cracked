import { Metadata } from "next";
import InfoCard from "@/components/dashboard/info-card";
import { AreaChartStacked } from "@/components/charts/area-chart-stacked";
import { BarChartMixed } from "@/components/charts/bar-chart-mixed";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Advanced analytics and insights for your SaaS business",
};

export default function AnalyticsPage() {
  // Mock data - in real implementation, fetch from database
  const metrics = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      changeType: "increase" as const,
    },
    {
      title: "Active Users (30d)",
      value: "1,234",
      change: "+8%",
      changeType: "increase" as const,
    },
    {
      title: "Monthly Recurring Revenue",
      value: "$12,847",
      change: "+15%",
      changeType: "increase" as const,
    },
    {
      title: "Churn Rate",
      value: "2.4%",
      change: "-0.5%",
      changeType: "decrease" as const,
    },
  ];

  const userGrowthData = [
    { month: "Jan", users: 400, revenue: 2400 },
    { month: "Feb", users: 300, revenue: 1398 },
    { month: "Mar", users: 200, revenue: 9800 },
    { month: "Apr", users: 278, revenue: 3908 },
    { month: "May", users: 189, revenue: 4800 },
    { month: "Jun", users: 239, revenue: 3800 },
    { month: "Jul", users: 349, revenue: 4300 },
  ];

  const subscriptionData = [
    { plan: "Starter", count: 1200, revenue: 0 },
    { plan: "Pro", count: 800, revenue: 12000 },
    { plan: "Business", count: 400, revenue: 12000 },
    { plan: "Enterprise", count: 50, revenue: 25000 },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your business performance and user engagement
        </p>
      </div>

      {/* Key Metrics */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <InfoCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
          />
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AreaChartStacked data={userGrowthData} />

            <BarChartMixed data={subscriptionData} />
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Daily Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">847</div>
                <p className="text-sm text-muted-foreground">+5% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,234</div>
                <p className="text-sm text-muted-foreground">+8% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,847</div>
                <p className="text-sm text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>MRR Trend</CardTitle>
                <CardDescription>Monthly recurring revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$12,847</div>
                <p className="text-sm text-green-600">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ARR Projection</CardTitle>
                <CardDescription>Annual recurring revenue forecast</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$154,164</div>
                <p className="text-sm text-muted-foreground">Based on current trends</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Feature Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>AI Chat</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Content Creation</span>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Team Collaboration</span>
                  <span className="text-sm font-medium">34%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>API Usage</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Visitors</span>
                  <span className="text-sm font-medium">10,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sign-ups</span>
                  <span className="text-sm font-medium">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Free Trials</span>
                  <span className="text-sm font-medium">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Paid Users</span>
                  <span className="text-sm font-medium">847</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>United States</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Europe</span>
                  <span className="text-sm font-medium">32%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Asia Pacific</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Other</span>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
