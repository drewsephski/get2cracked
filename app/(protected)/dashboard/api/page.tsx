import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
  title: "API Keys",
  description: "Manage your API keys and access permissions",
};

export default function APIKeysPage() {
  // Mock data - in real implementation, fetch from database
  const apiKeys = [
    {
      id: "1",
      name: "Production API Key",
      key: "gc_live_1234567890abcdef",
      lastUsed: "2024-02-15T10:30:00Z",
      created: "2024-01-15T00:00:00Z",
      status: "active",
      permissions: "read, write",
    },
    {
      id: "2",
      name: "Development Key",
      key: "gc_dev_0987654321fedcba",
      lastUsed: "2024-02-14T15:45:00Z",
      created: "2024-02-01T00:00:00Z",
      status: "active",
      permissions: "read",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">API Keys</h1>
        <p className="text-muted-foreground">
          Manage your API keys and access permissions
        </p>
      </div>

      {/* Create New API Key */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New API Key</CardTitle>
          <CardDescription>
            Generate a new API key for your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="key-name">Key Name</Label>
                <Input id="key-name" placeholder="e.g., Production API Key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="key-permissions">Permissions</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select permissions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read">Read Only</SelectItem>
                    <SelectItem value="write">Read & Write</SelectItem>
                    <SelectItem value="admin">Admin (Full Access)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="key-description">Description (Optional)</Label>
              <Textarea
                id="key-description"
                placeholder="Describe what this API key will be used for..."
                rows={3}
              />
            </div>
            <div className="flex gap-4">
              <Button>Generate API Key</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current API Keys */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys ({apiKeys.length})</CardTitle>
          <CardDescription>
            Manage your existing API keys and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <code className="rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
                      {apiKey.key.slice(0, 8)}...{apiKey.key.slice(-4)}
                    </code>
                  </TableCell>
                  <TableCell>{apiKey.permissions}</TableCell>
                  <TableCell>
                    {apiKey.lastUsed
                      ? new Date(apiKey.lastUsed).toLocaleDateString()
                      : "Never"
                    }
                  </TableCell>
                  <TableCell>{new Date(apiKey.created).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>
                      {apiKey.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* API Usage */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>API Usage</CardTitle>
          <CardDescription>
            Monitor your API usage and rate limits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">847</div>
              <div className="text-sm text-muted-foreground">Requests Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">12,543</div>
              <div className="text-sm text-muted-foreground">Requests This Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">85%</div>
              <div className="text-sm text-muted-foreground">Rate Limit Used</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Link */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Learn how to use your API keys and integrate with our services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Get started with our comprehensive API documentation including authentication,
              endpoints, examples, and best practices.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <a href="/docs/api">View API Docs</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/docs/api/authentication">Authentication Guide</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
