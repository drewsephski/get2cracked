import { Metadata } from "next";
import { CopyButton } from "@/components/shared/copy-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Referral Program",
  description: "Manage your referral program and track earnings",
};

export default function ReferralsPage() {
  // Mock data - in real implementation, fetch from database
  const referralCode = "GETCRACKED2024";
  const referralLink = `https://getcracked.com?ref=${referralCode}`;

  const stats = [
    {
      title: "Total Referrals",
      value: "24",
      description: "People you've referred",
    },
    {
      title: "Successful Conversions",
      value: "8",
      description: "Referrals who became paid users",
    },
    {
      title: "Pending Rewards",
      value: "$80",
      description: "Rewards waiting to be processed",
    },
    {
      title: "Total Earned",
      value: "$240",
      description: "Rewards you've received",
    },
  ];

  const referralHistory = [
    {
      id: "1",
      email: "john.doe@example.com",
      status: "COMPLETED",
      rewardAmount: 30,
      date: "2024-02-15",
      completedAt: "2024-02-20",
    },
    {
      id: "2",
      email: "jane.smith@example.com",
      status: "PENDING",
      rewardAmount: 30,
      date: "2024-02-10",
      completedAt: null,
    },
    {
      id: "3",
      email: "bob.wilson@example.com",
      status: "COMPLETED",
      rewardAmount: 30,
      date: "2024-01-28",
      completedAt: "2024-02-02",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Completed</Badge>;
      case "PENDING":
        return <Badge variant="outline">Pending</Badge>;
      case "REWARDED":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Rewarded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Referral Program</h1>
        <p className="text-muted-foreground">
          Share Get Cracked and earn rewards for successful referrals
        </p>
      </div>

      {/* Referral Code and Link */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
          <CardDescription>
            Share this code with friends and colleagues to earn rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="text-sm font-medium">Referral Code</label>
                <div className="mt-1 flex items-center space-x-2">
                  <code className="rounded bg-gray-100 px-3 py-2 font-mono text-sm dark:bg-gray-800">
                    {referralCode}
                  </code>
                  <CopyButton value={referralCode} />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="text-sm font-medium">Referral Link</label>
                <div className="mt-1 flex items-center space-x-2">
                  <code className="break-all rounded bg-gray-100 px-3 py-2 font-mono text-sm dark:bg-gray-800">
                    {referralLink}
                  </code>
                  <CopyButton value={referralLink} />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button>Share on Twitter</Button>
              <Button variant="outline">Share on LinkedIn</Button>
              <Button variant="outline">Copy Email Template</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
          <CardDescription>
            Track the status of your referrals and rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Date Referred</TableHead>
                <TableHead>Date Completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referralHistory.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium">{referral.email}</TableCell>
                  <TableCell>{getStatusBadge(referral.status)}</TableCell>
                  <TableCell>${referral.rewardAmount}</TableCell>
                  <TableCell>{new Date(referral.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {referral.completedAt
                      ? new Date(referral.completedAt).toLocaleDateString()
                      : "—"
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Program Terms */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Program Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground">How it works:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Share your referral code with potential users</li>
                <li>When they sign up and become paid subscribers, you earn rewards</li>
                <li>Rewards are processed monthly and added to your account</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-foreground">Reward Structure:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>$30 credit for each successful referral to Pro plan</li>
                <li>$50 credit for each successful referral to Business plan</li>
                <li>$100 credit for each successful referral to Enterprise plan</li>
                <li>Rewards are paid out monthly via your account credits</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-foreground">Important Notes:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Referrals must be new users who haven&apos;t previously signed up</li>
                <li>Rewards are only paid for users who maintain active subscriptions</li>
                <li>Program terms subject to change with 30 days notice</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
