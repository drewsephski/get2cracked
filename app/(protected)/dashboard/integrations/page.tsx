import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Dashboard Integrations",
  description: "Manage your connected third-party services and integrations",
};

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  status: "connected" | "available" | "setup-required";
  features: string[];
  setupGuide: string;
}

export default function DashboardIntegrationsPage() {
  // Mock data - in real implementation, fetch from database
  const integrations: Integration[] = [
    {
      id: "stripe",
      name: "Stripe",
      description: "Payment processing and subscription management",
      category: "Payment",
      logo: "💳",
      status: "connected",
      features: ["Subscriptions", "Webhooks", "Billing", "Invoices"],
      setupGuide: "Already configured with your subscription system",
    },
    {
      id: "clerk",
      name: "Clerk",
      description: "Authentication and user management",
      category: "Authentication",
      logo: "🔐",
      status: "connected",
      features: ["Social Login", "User Profiles", "Security", "SSO"],
      setupGuide: "Authentication is fully configured and ready to use",
    },
    {
      id: "resend",
      name: "Resend",
      description: "Email delivery and transactional emails",
      category: "Email",
      logo: "📧",
      status: "connected",
      features: ["Transactional", "Templates", "Analytics", "Webhooks"],
      setupGuide: "Email system is configured and operational",
    },
    {
      id: "openai",
      name: "OpenAI",
      description: "AI models and GPT integration",
      category: "AI",
      logo: "🤖",
      status: "setup-required",
      features: ["ChatGPT", "Embeddings", "Fine-tuning", "Streaming"],
      setupGuide: "Configure your OpenAI API key to enable AI features",
    },
    {
      id: "google-analytics",
      name: "Google Analytics",
      description: "Advanced website analytics",
      category: "Analytics",
      logo: "📈",
      status: "available",
      features: ["Events", "E-commerce", "Custom Reports", "Goals"],
      setupGuide: "Add your Google Analytics tracking ID",
    },
    {
      id: "slack",
      name: "Slack",
      description: "Team communication and notifications",
      category: "Communication",
      logo: "💬",
      status: "available",
      features: ["Notifications", "Commands", "Webhooks", "Apps"],
      setupGuide: "Connect your Slack workspace for team notifications",
    },
  ];

  const categories = ["All", "Connected", "Available", "Payment", "Authentication", "Email", "AI", "Analytics", "Communication"];

  const filteredIntegrations = (category: string) => {
    if (category === "All") return integrations;
    if (category === "Connected") return integrations.filter(i => i.status === "connected");
    if (category === "Available") return integrations.filter(i => i.status !== "connected");
    return integrations.filter(i => i.category === category);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Connected</Badge>;
      case "setup-required":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Setup Required</Badge>;
      case "available":
        return <Badge variant="outline">Available</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">
          Connect with third-party services to enhance your application
        </p>
      </div>

      {/* Integration Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50+</div>
            <p className="text-xs text-muted-foreground">Available services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Setup Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Needs configuration</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">46</div>
            <p className="text-xs text-muted-foreground">Ready to connect</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid w-full grid-cols-9">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-xs">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredIntegrations(category).map((integration) => (
                <Card key={integration.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{integration.logo}</div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <Badge variant="outline">{integration.category}</Badge>
                        </div>
                      </div>
                      {getStatusBadge(integration.status)}
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="rounded bg-gray-50 p-3 text-xs text-muted-foreground dark:bg-gray-800">
                        {integration.setupGuide}
                      </div>

                      <div className="flex gap-2">
                        {integration.status === "connected" ? (
                          <>
                            <Button variant="outline" className="flex-1">
                              Configure
                            </Button>
                            <Button variant="outline" size="sm">
                              <Switch defaultChecked />
                            </Button>
                          </>
                        ) : (
                          <Button className="w-full">
                            {integration.status === "setup-required" ? "Set Up" : "Connect"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Request Integration */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Request New Integration</CardTitle>
          <CardDescription>
            Don&apos;t see the integration you need? Let us know and we&apos;ll consider adding it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Name</label>
                <input
                  type="text"
                  placeholder="e.g., Mailchimp, Zapier, etc."
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
                  <option>Analytics</option>
                  <option>Communication</option>
                  <option>CRM</option>
                  <option>Email</option>
                  <option>Payment</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Use Case</label>
              <textarea
                placeholder="Describe how you plan to use this integration..."
                rows={3}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <Button>Submit Request</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
