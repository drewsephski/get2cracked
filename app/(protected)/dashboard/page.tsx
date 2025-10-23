import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { AddContentDialog } from "@/components/content/add-content-dialog";
import { Card } from "@/components/ui/card";

export const metadata = constructMetadata({
  title: "Dashboard – SaaS Starter",
  description: "Create and manage content.",
});

interface Content {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/content`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  let contents: Content[] = [];
  if (response.ok) {
    contents = await response.json();
  }

  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text={`Current Role : ${user?.role} — Change your role in settings.`}
      >
        <AddContentDialog />
      </DashboardHeader>

      <div>
        {contents.length === 0 ? (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No content created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any content yet. Start creating content.
            </EmptyPlaceholder.Description>
            <AddContentDialog />
          </EmptyPlaceholder>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contents.map((item) => (
              <Card key={item.id} className="p-4">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.content}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
