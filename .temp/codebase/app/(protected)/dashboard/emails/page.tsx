import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Email Campaigns",
  description: "Create and manage email marketing campaigns",
};

export default function EmailCampaignsPage() {
  // Mock data - in real implementation, fetch from database
  const campaigns = [
    {
      id: "1",
      name: "Welcome Series",
      subject: "Welcome to Get Cracked! 🚀",
      status: "SENT",
      scheduledFor: null,
      sentAt: "2024-02-15T09:00:00Z",
      recipientCount: 150,
      openRate: 45.2,
      clickRate: 12.8,
    },
    {
      id: "2",
      name: "Feature Update",
      subject: "New Features Available!",
      status: "DRAFT",
      scheduledFor: null,
      sentAt: null,
      recipientCount: 0,
      openRate: null,
      clickRate: null,
    },
    {
      id: "3",
      name: "Upgrade Reminder",
      subject: "Unlock More Features",
      status: "SCHEDULED",
      scheduledFor: "2024-02-20T10:00:00Z",
      sentAt: null,
      recipientCount: 200,
      openRate: null,
      clickRate: null,
    },
  ];

  const templates = [
    { name: "Welcome Email", description: "Welcome new users to your platform" },
    { name: "Feature Announcement", description: "Announce new features and updates" },
    { name: "Upgrade Prompt", description: "Encourage users to upgrade their plan" },
    { name: "Re-engagement", description: "Re-engage inactive users" },
    { name: "Newsletter", description: "Regular newsletter template" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SENT":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Sent</Badge>;
      case "SCHEDULED":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Scheduled</Badge>;
      case "DRAFT":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Email Campaigns</h1>
        <p className="text-muted-foreground">
          Create and manage email marketing campaigns for your users
        </p>
      </div>

      {/* Create New Campaign */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create Campaign</CardTitle>
          <CardDescription>
            Start a new email campaign to engage your users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input id="campaign-name" placeholder="e.g., Welcome Series" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaign-template">Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.name} value={template.name.toLowerCase()}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign-subject">Email Subject</Label>
              <Input id="campaign-subject" placeholder="Enter your email subject line" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign-content">Email Content</Label>
              <Textarea
                id="campaign-content"
                placeholder="Write your email content here..."
                rows={8}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="free">Free Users</SelectItem>
                    <SelectItem value="pro">Pro Users</SelectItem>
                    <SelectItem value="business">Business Users</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="When to send" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Send Now</SelectItem>
                    <SelectItem value="schedule">Schedule for Later</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button>Save as Draft</Button>
              <Button>Send Campaign</Button>
              <Button variant="outline">Preview</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>
            Pre-built templates to speed up your campaign creation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.name} className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="sm">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign History */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Campaign History</CardTitle>
          <CardDescription>
            Track performance of your email campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.subject}</TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>{campaign.recipientCount.toLocaleString()}</TableCell>
                  <TableCell>
                    {campaign.openRate ? `${campaign.openRate}%` : "—"}
                  </TableCell>
                  <TableCell>
                    {campaign.clickRate ? `${campaign.clickRate}%` : "—"}
                  </TableCell>
                  <TableCell>
                    {campaign.sentAt
                      ? new Date(campaign.sentAt).toLocaleDateString()
                      : campaign.scheduledFor
                      ? `Scheduled: ${new Date(campaign.scheduledFor).toLocaleDateString()}`
                      : "—"
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Duplicate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Campaign Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Analytics</CardTitle>
          <CardDescription>
            Overall performance metrics for your email campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-primary">847</div>
                  <div className="text-sm text-muted-foreground">Total Sent</div>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-primary">42.3%</div>
                  <div className="text-sm text-muted-foreground">Avg Open Rate</div>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-primary">8.7%</div>
                  <div className="text-sm text-muted-foreground">Avg Click Rate</div>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Total Campaigns</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-medium">Open Rates by Campaign</h4>
                    <div className="space-y-2">
                      {campaigns.filter(c => c.status === "SENT").map((campaign) => (
                        <div key={campaign.id} className="flex items-center justify-between">
                          <span className="text-sm">{campaign.name}</span>
                          <span className="text-sm font-medium">
                            {campaign.openRate}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3 font-medium">Click Rates by Campaign</h4>
                    <div className="space-y-2">
                      {campaigns.filter(c => c.status === "SENT").map((campaign) => (
                        <div key={campaign.id} className="flex items-center justify-between">
                          <span className="text-sm">{campaign.name}</span>
                          <span className="text-sm font-medium">
                            {campaign.clickRate}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
