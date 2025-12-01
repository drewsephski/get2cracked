import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export function Comparison() {
  return (
    <section className="bg-transparent">
      <MaxWidthWrapper>
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Build vs Buy: The Numbers Don&apos;t Lie
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See why thousands of developers choose Get Cracked over building from scratch
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Building from Scratch */}
          <div className="relative rounded-2xl border-2 border-red-200 bg-red-50 p-8 dark:border-red-800 dark:bg-red-950/20">
            <div className="absolute -top-4 left-8 rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white">
              Building from Scratch
            </div>
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between border-b border-red-200 py-3 dark:border-red-800">
                <span className="text-muted-foreground">Development Time</span>
                <span className="font-semibold text-red-600">6+ months</span>
              </div>
              <div className="flex items-center justify-between border-b border-red-200 py-3 dark:border-red-800">
                <span className="text-muted-foreground">Developer Cost</span>
                <span className="font-semibold text-red-600">$75,000+</span>
              </div>
              <div className="flex items-center justify-between border-b border-red-200 py-3 dark:border-red-800">
                <span className="text-muted-foreground">Time to Market</span>
                <span className="font-semibold text-red-600">6+ months</span>
              </div>
              <div className="flex items-center justify-between border-b border-red-200 py-3 dark:border-red-800">
                <span className="text-muted-foreground">Opportunity Cost</span>
                <span className="font-semibold text-red-600">$50K+ lost revenue</span>
              </div>
              <div className="flex items-center justify-between border-b border-red-200 py-3 dark:border-red-800">
                <span className="text-muted-foreground">Maintenance Burden</span>
                <span className="font-semibold text-red-600">High</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-muted-foreground">Risk of Failure</span>
                <span className="font-semibold text-red-600">Very High</span>
              </div>
            </div>
          </div>

          {/* Using Get Cracked */}
          <div className="relative rounded-2xl border-2 border-green-200 bg-green-50 p-8 dark:border-green-800 dark:bg-green-950/20">
            <div className="absolute -top-4 left-8 rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white">
              Using Get Cracked
            </div>
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between border-b border-green-200 py-3 dark:border-green-800">
                <span className="text-muted-foreground">Setup Time</span>
                <span className="font-semibold text-green-600">20 minutes</span>
              </div>
              <div className="flex items-center justify-between border-b border-green-200 py-3 dark:border-green-800">
                <span className="text-muted-foreground">Cost</span>
                <span className="font-semibold text-green-600">$30/month</span>
              </div>
              <div className="flex items-center justify-between border-b border-green-200 py-3 dark:border-green-800">
                <span className="text-muted-foreground">Time to Market</span>
                <span className="font-semibold text-green-600">2 days</span>
              </div>
              <div className="flex items-center justify-between border-b border-green-200 py-3 dark:border-green-800">
                <span className="text-muted-foreground">Opportunity Cost</span>
                <span className="font-semibold text-green-600">$0</span>
              </div>
              <div className="flex items-center justify-between border-b border-green-200 py-3 dark:border-green-800">
                <span className="text-muted-foreground">Maintenance</span>
                <span className="font-semibold text-green-600">Included</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-muted-foreground">Success Rate</span>
                <span className="font-semibold text-green-600">95%+</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-gradient-to-r from-blue-50 to-gray-50 p-8 text-center dark:from-blue-950/20 dark:to-gray-950/20">
          <div className="mb-2 text-4xl font-bold text-primary">
            You Save $75,000 and 6 Months
          </div>
          <p className="text-lg text-muted-foreground">
            Plus ongoing maintenance, security updates, and feature enhancements included at no extra cost
          </p>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
