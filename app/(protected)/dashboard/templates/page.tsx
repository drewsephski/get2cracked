import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const metadata: Metadata = {
  title: "Page Templates",
  description: "Browse and use pre-built page templates for your application",
};

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  previewImage: string;
  isPremium: boolean;
  features: string[];
  code: string;
}

export default function TemplatesPage() {
  // Mock data - in real implementation, fetch from database
  const templates: Template[] = [
    {
      id: "1",
      name: "Modern Landing Page",
      description: "Clean, modern landing page with hero section, features, and CTA",
      category: "Landing Pages",
      previewImage: "/_static/templates/landing-1.jpg",
      isPremium: false,
      features: ["Hero Section", "Features Grid", "Testimonials", "Pricing", "Contact Form"],
      code: "// Template code here",
    },
    {
      id: "2",
      name: "Dashboard Overview",
      description: "Comprehensive dashboard with analytics, charts, and user management",
      category: "Dashboard Pages",
      previewImage: "/_static/templates/dashboard-1.jpg",
      isPremium: false,
      features: ["Analytics Cards", "Charts", "Data Tables", "Navigation", "User Profile"],
      code: "// Template code here",
    },
    {
      id: "3",
      name: "Authentication Pages",
      description: "Complete auth flow with login, signup, and password reset",
      category: "Auth Pages",
      previewImage: "/_static/templates/auth-1.jpg",
      isPremium: false,
      features: ["Login Form", "Signup Form", "Password Reset", "Social Auth", "Validation"],
      code: "// Template code here",
    },
    {
      id: "4",
      name: "Pricing Page",
      description: "Professional pricing page with comparison tables and features",
      category: "Pricing Pages",
      previewImage: "/_static/templates/pricing-1.jpg",
      isPremium: false,
      features: ["Pricing Tiers", "Feature Comparison", "FAQ Section", "CTA Buttons"],
      code: "// Template code here",
    },
    {
      id: "5",
      name: "Blog Layout",
      description: "Modern blog layout with post grid, categories, and search",
      category: "Blog Pages",
      previewImage: "/_static/templates/blog-1.jpg",
      isPremium: false,
      features: ["Post Grid", "Categories", "Search", "Pagination", "Social Sharing"],
      code: "// Template code here",
    },
    {
      id: "6",
      name: "Advanced Analytics",
      description: "Premium analytics dashboard with advanced metrics and insights",
      category: "Dashboard Pages",
      previewImage: "/_static/templates/analytics-1.jpg",
      isPremium: true,
      features: ["Advanced Charts", "Real-time Data", "Custom Metrics", "Export Options"],
      code: "// Template code here",
    },
  ];

  const categories = ["All", "Landing Pages", "Dashboard Pages", "Auth Pages", "Pricing Pages", "Blog Pages"];

  const filteredTemplates = (category: string) => {
    if (category === "All") return templates;
    return templates.filter(template => template.category === category);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Page Templates</h1>
        <p className="text-muted-foreground">
          Choose from 50+ pre-built templates to accelerate your development
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50+</div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">Included with all plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">Business+ plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Template categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates(category).map((template) => (
                <Card key={template.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="flex aspect-video items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <div className="text-4xl">📄</div>
                    {template.isPremium && (
                      <Badge className="absolute right-2 top-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        Premium
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {template.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {template.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1">
                              Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{template.name}</DialogTitle>
                              <DialogDescription>{template.description}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                <div className="text-6xl">📄</div>
                              </div>
                              <div>
                                <h4 className="mb-2 font-medium">Template Code:</h4>
                                <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-xs dark:bg-gray-800">
                                  <code>{template.code}</code>
                                </pre>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button className="flex-1">
                          {template.isPremium ? "Upgrade to Use" : "Use Template"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Getting Started */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Getting Started with Templates</CardTitle>
          <CardDescription>
            Learn how to customize and deploy your chosen templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="p-4 text-center">
                <div className="mb-2 text-3xl">1️⃣</div>
                <h4 className="font-medium">Choose Template</h4>
                <p className="text-sm text-muted-foreground">
                  Select a template that matches your needs
                </p>
              </div>
              <div className="p-4 text-center">
                <div className="mb-2 text-3xl">2️⃣</div>
                <h4 className="font-medium">Customize</h4>
                <p className="text-sm text-muted-foreground">
                  Modify colors, content, and styling to match your brand
                </p>
              </div>
              <div className="p-4 text-center">
                <div className="mb-2 text-3xl">3️⃣</div>
                <h4 className="font-medium">Deploy</h4>
                <p className="text-sm text-muted-foreground">
                  Deploy your customized template to production
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button asChild>
                <a href="/docs/customization">View Customization Guide</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
