import { Metadata } from "next";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Team Management",
  description: "Manage your workspace members and invitations",
};

export default async function TeamPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Mock data - in real implementation, fetch from database
  const workspace = {
    name: "Get Cracked",
    plan: "Business",
    memberCount: 3,
  };

  const members = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "OWNER",
      joinedAt: "2024-01-15",
      avatar: null,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "ADMIN",
      joinedAt: "2024-01-20",
      avatar: null,
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "MEMBER",
      joinedAt: "2024-02-01",
      avatar: null,
    },
  ];

  const invitations = [
    {
      id: "1",
      email: "alice@example.com",
      role: "MEMBER",
      expiresAt: "2024-12-31",
      status: "PENDING",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <p className="text-muted-foreground">
          Manage your workspace members and invitations
        </p>
      </div>

      {/* Workspace Info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Workspace Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{workspace.name}</h3>
              <p className="text-muted-foreground">
                {workspace.memberCount} members • {workspace.plan} plan
              </p>
            </div>
            <Button>Invite Member</Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Members */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Members ({members.length})</CardTitle>
          <CardDescription>
            Manage roles and permissions for your team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <UserAvatar user={{ name: member.name, image: member.avatar }} />
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={member.role === "OWNER" ? "default" : "secondary"}>
                    {member.role}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Change Role
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Invitations ({invitations.length})</CardTitle>
          <CardDescription>
            Manage outstanding team invitations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <span className="text-sm font-medium text-muted-foreground">
                      {invitation.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{invitation.email}</h4>
                    <p className="text-sm text-muted-foreground">
                      Expires: {new Date(invitation.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{invitation.role}</Badge>
                  <Button variant="outline" size="sm">
                    Resend
                  </Button>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
