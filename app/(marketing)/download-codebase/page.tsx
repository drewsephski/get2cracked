import { currentUser } from "@clerk/nextjs/server";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { Download, CheckCircle, ArrowRight } from "lucide-react";

export default async function DownloadCodebasePage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect("/sign-in");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  if (!subscriptionPlan.isPaid) {
    redirect("/pricing");
  }

  const planName = subscriptionPlan.title;
  const isBusinessPlan = planName === "Business";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="size-8 text-green-600" />
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Welcome to {planName}! 🎉
        </h1>

        <p className="mb-8 text-xl text-muted-foreground">
          Your subscription is active and your codebase is ready to download
        </p>
      </div>

      <div className="mb-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-semibold">Download Your Codebase</h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Your complete SaaS starter template is ready. Click the download button below
            to get your codebase with all the features and setup instructions included.
          </p>

          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 font-semibold">What&apos;s included in your download:</h3>
            <div className="grid grid-cols-1 gap-3 text-left text-sm md:grid-cols-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-green-500" />
                <span>Complete Next.js 15 codebase</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-green-500" />
                <span>Pre-configured authentication (Clerk)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-green-500" />
                <span>Payment processing (Stripe)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-green-500" />
                <span>Database setup (Prisma + PostgreSQL)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-green-500" />
                <span>Beautiful UI components (Shadcn/ui)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-green-500" />
                <span>Production-ready deployment config</span>
              </div>
              {isBusinessPlan && (
                <>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Pre-built AI chat interface</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Preconfigured AI providers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Text-to-speech functionality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-500" />
                    <span>Advanced AI components</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <Link href="/api/download-codebase">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Download className="mr-2 size-5" />
              Download Codebase
            </Button>
          </Link>

          <p className="mt-4 text-sm text-muted-foreground">
            Download size: ~5MB • Format: ZIP archive
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-6">
        <h3 className="mb-3 font-semibold">Next Steps After Download:</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-3">
            <span className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">1</span>
            <span>Extract the zip file to your desired location</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">2</span>
            <span>Run <code className="rounded bg-gray-200 px-1">npm install</code> to install dependencies</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">3</span>
            <span>Copy <code className="rounded bg-gray-200 px-1">.env.example</code> to <code className="rounded bg-gray-200 px-1">.env.local</code> and configure your environment variables</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">4</span>
            <span>Run <code className="rounded bg-gray-200 px-1">npm run dev</code> to start development</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">5</span>
            <span>Follow the setup guide in the README.md file</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="mb-4 text-muted-foreground">
          Need help getting started? Check out our documentation or contact support.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="https://getcracked.lol/docs">
            <Button variant="outline">
              <Icons.book className="mr-2 size-4" />
              Documentation
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button>
              Go to Dashboard
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Development Test Mode */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-12 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="size-2 rounded-full bg-yellow-400"></div>
            <h3 className="font-semibold text-yellow-800">Development Mode</h3>
          </div>
          <p className="mb-4 text-sm text-yellow-700">
            You can test the download functionality without a subscription while in development mode.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/api/test-download">
              <Button variant="outline" size="sm" className="border-yellow-300 bg-yellow-100">
                🚀 Test Download (Auto-bypass)
              </Button>
            </Link>
            <Link href="/api/download-codebase?test=true">
              <Button variant="outline" size="sm" className="border-yellow-300 bg-yellow-100">
                📥 Test Download (Direct)
              </Button>
            </Link>
            <Link href="/api/download-codebase?bypass=true">
              <Button variant="outline" size="sm" className="border-yellow-300 bg-yellow-100">
                🔓 Test Download (Bypass Auth)
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
