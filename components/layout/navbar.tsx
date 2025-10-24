"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";

import { docsConfig } from "@/config/docs";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DocsSearch } from "@/components/docs/search";
import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";
import { LogOut, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const { user } = useUser();
  const { signOut } = useAuth();
  const { setShowSignInModal, setShowSignUpModal } = useContext(ModalContext);
  const [isOpen, setIsOpen] = useState(false);

  const selectedLayout = useSelectedLayoutSegment();
  const documentation = selectedLayout === "docs";

  const configMap = {
    docs: docsConfig.mainNav,
  };

  const links =
    (selectedLayout && configMap[selectedLayout]) || marketingConfig.mainNav;

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
        }`}
    >
      <MaxWidthWrapper className="flex h-14 items-center justify-between py-4">
        <div className="flex gap-4 md:gap-10">
          <Link href="/" className="flex items-center space-x-1.5">
            <Icons.logo className="size-7 text-blue-500" />
            <span className="font-urban text-xl font-bold">
              {siteConfig.name}
            </span>
          </Link>
          {links && links.length > 0 ? (
            <nav className="hidden gap-6 md:flex">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  prefetch={true}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    item.href.startsWith(`/${selectedLayout}`)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center space-x-2">
          {/* Desktop Navigation */}
          <div className="items-center space-x-2 hidden md:flex">
            {documentation ? (
              <div className="hidden flex-1 items-center space-x-4 sm:justify-end lg:flex">
                <div className="hidden lg:flex lg:grow-0">
                  <DocsSearch />
                </div>
                <div className="flex lg:hidden">
                  <Icons.search className="size-6 text-muted-foreground" />
                </div>
                <div className="flex space-x-4">
                  <Link
                    href="mailto:support@saasy.com"
                    className="flex items-center text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
                  >
                    <Icons.help className="mr-2 size-4" />
                    <span>Get Help</span>
                  </Link>
                </div>
              </div>
            ) : null}

            {user ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Link
                  href={user.publicMetadata?.role === "ADMIN" ? "/admin" : "/dashboard"}
                >
                  <Button
                    className="gap-2 px-5"
                    variant="default"
                    size="sm"
                    rounded="full"
                  >
                    <span>Dashboard</span>
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  rounded="full"
                  onClick={() => signOut({ redirectUrl: "/" })}
                >
                  <LogOut className="mr-2 size-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button
                  className="group gap-2 px-5"
                  variant="outline"
                  size="sm"
                  rounded="full"
                  onClick={() => setShowSignUpModal(true)}
                >
                  <span>Sign Up</span>
                  <Icons.arrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  className="group gap-2 px-5"
                  variant="default"
                  size="sm"
                  rounded="full"
                  onClick={() => setShowSignInModal(true)}
                >
                  <span>Sign In</span>
                  <Icons.arrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {links.map((item, index) => (
                  <SheetClose asChild key={index}>
                    <Link
                      href={item.disabled ? "#" : item.href}
                      prefetch={true}
                      className={cn(
                        "flex items-center text-lg font-medium transition-colors hover:text-foreground/80",
                        item.href.startsWith(`/${selectedLayout}`)
                          ? "text-foreground"
                          : "text-foreground/60",
                        item.disabled && "cursor-not-allowed opacity-80",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
                {user ? (
                  <>
                    <SheetClose asChild>
                      <Link
                        href={user.publicMetadata?.role === "ADMIN" ? "/admin" : "/dashboard"}
                        className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </SheetClose>
                    <Button
                      variant="ghost"
                      className="justify-start text-lg font-medium"
                      onClick={() => {
                        signOut({ redirectUrl: "/" });
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 size-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="justify-start text-lg font-medium"
                      onClick={() => {
                        setShowSignUpModal(true);
                        setIsOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start text-lg font-medium"
                      onClick={() => {
                        setShowSignInModal(true);
                        setIsOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                  </>
                )}
                <div className="mt-4">
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
