"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export function HeroInteractiveButton() {
  const { isSignedIn } = useAuth();
  const href = isSignedIn ? "/dashboard" : "/sign-up";

  return (
    <Link href={href} className="block">
      <InteractiveHoverButton
        as="div"
        text="Get Started"
        className="group gap-2 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
      />
    </Link>
  );
}