import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export function SocialProof() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-24 dark:from-gray-900 dark:to-gray-800">
      <MaxWidthWrapper>
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Trusted by developers worldwide
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Join thousands of developers who have accelerated their SaaS development with Get Cracked
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Products Built</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">$10M+</div>
            <div className="text-muted-foreground">Saved in Dev Costs</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">4.9/5</div>
            <div className="text-muted-foreground">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">95%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-8 opacity-60 md:grid-cols-4">
          {/* Company logos - placeholder for now */}
          <div className="flex h-12 items-center justify-center rounded-lg border bg-white dark:bg-gray-800">
            <span className="text-sm font-medium text-muted-foreground">Company A</span>
          </div>
          <div className="flex h-12 items-center justify-center rounded-lg border bg-white dark:bg-gray-800">
            <span className="text-sm font-medium text-muted-foreground">Company B</span>
          </div>
          <div className="flex h-12 items-center justify-center rounded-lg border bg-white dark:bg-gray-800">
            <span className="text-sm font-medium text-muted-foreground">Company C</span>
          </div>
          <div className="flex h-12 items-center justify-center rounded-lg border bg-white dark:bg-gray-800">
            <span className="text-sm font-medium text-muted-foreground">Company D</span>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 text-center dark:bg-gray-800">
            <div className="mb-2 text-2xl font-bold text-primary">SOC 2</div>
            <div className="text-sm text-muted-foreground">Compliant</div>
          </div>
          <div className="rounded-lg border bg-white p-6 text-center dark:bg-gray-800">
            <div className="mb-2 text-2xl font-bold text-primary">GDPR</div>
            <div className="text-sm text-muted-foreground">Ready</div>
          </div>
          <div className="rounded-lg border bg-white p-6 text-center dark:bg-gray-800">
            <div className="mb-2 text-2xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
