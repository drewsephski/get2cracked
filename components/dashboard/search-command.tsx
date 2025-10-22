"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SidebarNavItem } from "@/types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Icons } from "@/components/shared/icons";

interface SearchCommandProps {
  links: Array<{
    title: string;
    items: Array<{
      title: string;
      href: string;
      icon?: keyof typeof Icons;
      disabled?: boolean;
    }>;
  }>;
}

export function SearchCommand({ links }: SearchCommandProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((href: string) => {
    setOpen(false);
    router.push(href);
  }, [router]);

  // Filter out sections with no items
  const filteredLinks = links.filter(section => section.items.length > 0);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-md bg-muted/50 text-sm font-normal text-muted-foreground shadow-none hover:bg-muted/70 sm:pr-12 md:w-72",
        )}
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">
          Search
          <span className="hidden sm:inline-flex">&nbsp;pages</span>...
        </span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.45rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {filteredLinks.length > 0 ? (
            filteredLinks.map((section) => (
              <CommandGroup key={section.title} heading={section.title}>
                {section.items.map((item) => {
                  const Icon = Icons[item.icon || "arrowRight"];
                  return (
                    <div
                      className="group relative rounded-md transition-colors hover:bg-accent/50"
                      onClick={() => runCommand(item.href)}
                    >
                      <CommandItem
                        key={`${section.title}-${item.title}`}
                        value={`${section.title} ${item.title}`}
                        onSelect={() => runCommand(item.href)}
                        className={cn(
                          "w-full cursor-pointer transition-colors",
                          "group-hover:bg-accent/50",
                          "active:bg-accent/70"
                        )}
                        disabled={item.disabled}
                        role="command-item"
                      >
                        <Icon className="mr-3 size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                        <span className="flex-1 text-left transition-colors group-hover:text-foreground">
                          {item.title}
                        </span>
                        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                          <span className="text-xs">↵</span>
                        </kbd>
                      </CommandItem>
                    </div>
                  );
                })}
              </CommandGroup>
            ))
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No pages found.
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
