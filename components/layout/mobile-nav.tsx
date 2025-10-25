"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { docsConfig } from "@/config/docs";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { DocsSidebarNav } from "@/components/docs/sidebar-nav";
import { Icons } from "@/components/shared/icons";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function NavMobile() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const selectedLayout = useSelectedLayoutSegment();
  const documentation = selectedLayout === "docs";

  const configMap = {
    docs: docsConfig.mainNav,
  };

  const links =
    (selectedLayout && configMap[selectedLayout]) || marketingConfig.mainNav;

  // prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed right-2 top-2.5 z-50 rounded-full p-2 transition-colors duration-200 hover:bg-muted focus:outline-none active:bg-muted md:hidden",
          open && "hover:bg-muted active:bg-muted",
        )}
      >
        {open ? (
          <X className="size-5 text-muted-foreground" />
        ) : (
          <Menu className="size-5 text-muted-foreground" />
        )}
      </button>

      <nav
        className={cn(
          "fixed inset-0 z-20 hidden size-full overflow-y-auto bg-background px-4 py-16 lg:hidden",
          "overscroll-contain",
          open && "block",
        )}
      >
        <ul className="grid w-full divide-y divide-muted">
          {links && links.length > 0 && links.map(({ title, href }) => (
            <li key={href} className="py-3">
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="flex w-full font-medium capitalize"
              >
                {title}
              </Link>
            </li>
          ))}

          {user ? (
            <>
              {user.publicMetadata?.role === "ADMIN" ? (
                <li className="py-3">
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex w-full font-medium capitalize"
                  >
                    Admin
                  </Link>
                </li>
              ) : null}

              <li className="py-3">
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex w-full font-medium capitalize"
                >
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="py-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex w-full font-medium capitalize"
                >
                  Login
                </Link>
              </li>

              <li className="py-3">
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex w-full font-medium capitalize"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>

        {documentation ? (
          <div className="mt-8 block md:hidden">
            <DocsSidebarNav setOpen={setOpen} />
          </div>
        ) : null}

        <div className="mt-5 flex w-full items-center justify-end space-x-4 pr-2">
          <Link href="https://github.com/drewsephski" target="_blank" rel="noreferrer">
            <Icons.gitHub className="size-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <AnimatedThemeToggler className="size-9 rounded-full border p-1.5 hover:bg-accent" />
        </div>
      </nav>
    </>
  );
}
