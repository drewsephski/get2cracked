import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Webhooks",
  description: "Configure and manage webhook endpoints for real-time notifications",
};

export default function WebhooksPage() {
  // Mock data - in real implementation, fetch from database
  const webhooks = [
    {
      id: "1",
      url: "https://api.example.com/webhooks/getcracked",
      events: ["user.created", "user.updated", "subscription.created"],
      secret: "wh_sec_1234567890abcdef",
      status: "active",
      lastTriggered: "2024-02-15T10:30:00Z",
      successRate: 98,
    },
    {
      id: "2",
      url: "https://app.example.com/hooks",
      events: ["subscription.cancelled", "payment.succeeded"],
      secret: "wh_sec_0987654321fedcba",
      status: "active",
      lastTriggered: "2024-02-14T15:45:00Z",
      successRate: 100,
    },
  ];

  const events = [
    "user.created",
    "user.updated",
    "user.deleted",
    "subscription.created",
    "subscription.updated",
    "subscription.cancelled",
    "payment.succeeded",
    "payment.failed",
    "referral.completed",
    "team.invitation_sent",
    "team.member_added",
  ];

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
        Active
      </Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Webhooks</h1>
        <p className="text-muted-foreground">
          Configure webhook endpoints to receive real-time notifications
        </p>
      </div>

      {/* Create New Webhook */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Webhook</CardTitle>
          <CardDescription>
            Create a new webhook endpoint to receive event notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Endpoint URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://your-app.com/webhooks/getcracked"
                type="url"
              />
              <p className="text-sm text-muted-foreground">
                The URL that will receive webhook notifications
              </p>
            </div>

            <div className="space-y-2">
              <Label>Events to Subscribe</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {events.map((event) => (
                  <div key={event} className="flex items-center space-x-2">
                    <input type="checkbox" id={event} className="rounded" />
                    <Label htmlFor={event} className="text-sm">
                      {event}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button>Create Webhook</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Webhooks */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Webhooks ({webhooks.length})</CardTitle>
          <CardDescription>
            Manage your webhook endpoints and their configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Last Triggered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell>
                    <code className="break-all rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
                      {webhook.url}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.slice(0, 2).map((event) => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                      {webhook.events.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{webhook.events.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(webhook.status)}</TableCell>
                  <TableCell>
                    <span className={webhook.successRate >= 95 ? "text-green-600" : "text-yellow-600"}>
                      {webhook.successRate}%
                    </span>
                  </TableCell>
                  <TableCell>
                    {webhook.lastTriggered
                      ? new Date(webhook.lastTriggered).toLocaleDateString()
                      : "Never"
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Test
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Webhook Logs */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
          <CardDescription>
            View recent webhook delivery attempts and responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent" className="w-full">
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
              <TabsTrigger value="retry">Retry Queue</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4">
              <div className="space-y-2">
                {[
                  { id: "1", event: "user.created", status: 200, timestamp: "2024-02-15T10:30:00Z", duration: "120ms" },
                  { id: "2", event: "subscription.created", status: 200, timestamp: "2024-02-15T10:25:00Z", duration: "95ms" },
                  { id: "3", event: "payment.succeeded", status: 200, timestamp: "2024-02-15T10:20:00Z", duration: "145ms" },
                ].map((log) => (
                  <div key={log.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{log.event}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                      <span className="font-mono text-sm">{log.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={log.status === 200 ? "default" : "destructive"}>
                        {log.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Security Information */}
      <Card>
        <CardHeader>
          <CardTitle>Security & Best Practices</CardTitle>
          <CardDescription>
            Important information about webhook security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="mb-2 font-medium">Webhook Signatures</h4>
              <p className="mb-2 text-muted-foreground">
                All webhook requests include an HMAC SHA-256 signature in the X-Signature header.
                Use the webhook secret to verify the authenticity of requests.
              </p>
              <code className="block rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
                X-Signature: sha256=abc123def456...
              </code>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Retry Policy</h4>
              <p className="text-muted-foreground">
                Failed webhook deliveries will be retried up to 5 times with exponential backoff.
                After 5 failed attempts, the webhook will be disabled.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Rate Limiting</h4>
              <p className="text-muted-foreground">
                Your webhook endpoints should respond within 10 seconds and handle up to
                100 requests per minute per endpoint.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
