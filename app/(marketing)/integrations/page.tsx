import { Metadata } from "next";
import { HeaderSection } from "@/components/shared/header-section";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Pre-built integrations to accelerate your SaaS development",
};

interface Integration {
  name: string;
  description: string;
  category: string;
  logo: string;
  status: "pre-configured" | "easy-setup" | "available";
  features: string[];
}

const integrations: Integration[] = [
  // Pre-configured integrations
  {
    name: "Stripe",
    description: "Payment processing and subscription management",
    category: "Payment",
    logo: "💳",
    status: "pre-configured",
    features: ["Subscriptions", "Webhooks", "Billing", "Invoices"],
  },
  {
    name: "Clerk",
    description: "Authentication and user management",
    category: "Authentication",
    logo: "🔐",
    status: "pre-configured",
    features: ["Social Login", "User Profiles", "Security", "SSO"],
  },
  {
    name: "Resend",
    description: "Email delivery and transactional emails",
    category: "Email",
    logo: "📧",
    status: "pre-configured",
    features: ["Transactional", "Templates", "Analytics", "Webhooks"],
  },
  {
    name: "Prisma",
    description: "Database ORM and migrations",
    category: "Database",
    logo: "🗄️",
    status: "pre-configured",
    features: ["PostgreSQL", "Migrations", "Type Safety", "Relations"],
  },
  {
    name: "Vercel Analytics",
    description: "Website analytics and performance monitoring",
    category: "Analytics",
    logo: "📊",
    status: "pre-configured",
    features: ["Real-time", "Performance", "User Insights", "Conversion"],
  },

  // Easy setup integrations
  {
    name: "OpenAI",
    description: "AI models and GPT integration",
    category: "AI",
    logo: "🤖",
    status: "easy-setup",
    features: ["ChatGPT", "Embeddings", "Fine-tuning", "Streaming"],
  },
  {
    name: "Google Analytics",
    description: "Advanced website analytics",
    category: "Analytics",
    logo: "📈",
    status: "easy-setup",
    features: ["Events", "E-commerce", "Custom Reports", "Goals"],
  },
  {
    name: "Slack",
    description: "Team communication and notifications",
    category: "Communication",
    logo: "💬",
    status: "easy-setup",
    features: ["Notifications", "Commands", "Webhooks", "Apps"],
  },
  {
    name: "Discord",
    description: "Community and support channels",
    category: "Communication",
    logo: "🎮",
    status: "easy-setup",
    features: ["Bots", "Webhooks", "Embeds", "Interactions"],
  },
  {
    name: "AWS S3",
    description: "Cloud storage and file management",
    category: "Storage",
    logo: "☁️",
    status: "easy-setup",
    features: ["File Upload", "CDN", "Backup", "Security"],
  },
  {
    name: "Cloudinary",
    description: "Image and video optimization",
    category: "Storage",
    logo: "🖼️",
    status: "easy-setup",
    features: ["Optimization", "Transformation", "Delivery", "Analytics"],
  },

  // Available integrations
  {
    name: "HubSpot",
    description: "CRM and marketing automation",
    category: "CRM",
    logo: "🎯",
    status: "available",
    features: ["Contacts", "Deals", "Marketing", "Analytics"],
  },
  {
    name: "Salesforce",
    description: "Enterprise CRM platform",
    category: "CRM",
    logo: "🏢",
    status: "available",
    features: ["Sales", "Service", "Marketing", "Analytics"],
  },
  {
    name: "Mailchimp",
    description: "Email marketing platform",
    category: "Email",
    logo: "📧",
    status: "available",
    features: ["Campaigns", "Automation", "Templates", "Reports"],
  },
  {
    name: "SendGrid",
    description: "Email delivery API",
    category: "Email",
    logo: "📬",
    status: "available",
    features: ["API", "Templates", "Analytics", "Webhooks"],
  },
  {
    name: "Mixpanel",
    description: "Product analytics platform",
    category: "Analytics",
    logo: "📊",
    status: "available",
    features: ["Events", "Funnels", "Cohorts", "A/B Testing"],
  },
  {
    name: "Segment",
    description: "Customer data platform",
    category: "Analytics",
    logo: "🔄",
    status: "available",
    features: ["Tracking", "Destinations", "Personas", "Protocols"],
  },
  {
    name: "Telegram",
    description: "Messaging and bot platform",
    category: "Communication",
    logo: "📱",
    status: "available",
    features: ["Bots", "Channels", "Groups", "Webhooks"],
  },
  {
    name: "Twilio",
    description: "Communication APIs",
    category: "Communication",
    logo: "📞",
    status: "available",
    features: ["SMS", "Voice", "WhatsApp", "Email"],
  },
  {
    name: "MongoDB",
    description: "NoSQL database",
    category: "Database",
    logo: "🍃",
    status: "available",
    features: ["Documents", "Aggregation", "Indexing", "Atlas"],
  },
  {
    name: "Redis",
    description: "In-memory data store",
    category: "Database",
    logo: "⚡",
    status: "available",
    features: ["Caching", "Sessions", "Queues", "Pub/Sub"],
  },
];

const categories = ["All", "Payment", "Authentication", "Email", "Database", "Analytics", "AI", "Communication", "Storage", "CRM"];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderSection
        title="Integrations"
        subtitle="Pre-built integrations to accelerate your development"
      />

      <section className="py-24">
        <MaxWidthWrapper>
          {/* Stats */}
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Pre-built Integrations</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">100+</div>
              <div className="text-muted-foreground">Hours Saved</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">OAuth & API</div>
              <div className="text-muted-foreground">Key Support</div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
              <Card key={integration.name} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{integration.logo}</div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <Badge
                          variant={
                            integration.status === "pre-configured"
                              ? "default"
                              : integration.status === "easy-setup"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {integration.status === "pre-configured"
                            ? "Pre-configured"
                            : integration.status === "easy-setup"
                            ? "Easy Setup"
                            : "Available"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {integration.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {integration.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{integration.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button className="w-full" size="sm">
                      {integration.status === "pre-configured"
                        ? "View Docs"
                        : "Learn More"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Need a Custom Integration?</CardTitle>
                <CardDescription>
                  Don&apos;t see the integration you need? We can help you build custom integrations or you can request new ones.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button className="flex-1">
                    Request Integration
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
