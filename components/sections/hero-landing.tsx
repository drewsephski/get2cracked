import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { TypewriterText } from "@/components/ui/typewriter-text";

export default function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "secondary", rounded: "full" }),
            "group relative inline-flex items-center px-4 py-2 text-sm font-medium transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10",
          )}
        >
          <span className="mr-2"><Icons.nextjs className="size-4" /></span>Try AI-Powered SaaS
          <div className="ml-1">
            <Icons.arrowRight
              className={`size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45`}
            />
          </div>
        </Link>

        <h1 className="text-balance font-bricolage text-2xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-[66px]">
          Launch your SaaS{" "}
          <span className="text-gradient_blue">
            <TypewriterText 
              words={["10x faster", "today", "profitably", "successfully"]}
              className="inline-block w-fit text-left text-3xl sm:min-w-[100px] sm:text-4xl md:min-w-[150px] md:text-5xl lg:text-6xl xl:text-[66px]"
              cursorClassName="ml-1 h-6 sm:h-8 md:h-10 w-1 bg-gradient-to-b from-blue-500 to-blue-600"
              typingSpeed={100}
              deletingSpeed={50}
              delayBetweenWords={1500}
            />
          </span>
          <br className="hidden sm:block" />
          with our modern tech stack
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Skip the months of setup and thousands in development costs. Launch your SaaS today with our battle-tested foundation and start growing your business faster.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/pricing"
            prefetch={true}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "group gap-2 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10",
            )}
          >
            <span>Get Started</span>
            <Icons.arrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                rounded: "full",
              }),
              "group px-5 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10",
            )}
          >
            <Icons.package className="mr-2 size-4" />
            <span>View Pricing</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
