import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.HTMLAttributes<HTMLElement> {
  text?: string;
  as?: React.ElementType;
  href?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLElement,
  InteractiveHoverButtonProps
>(({ 
  text = "Button", 
  className, 
  as: Component = 'button',
  ...props 
}, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        "group relative inline-flex w-40 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-background p-2 text-center font-semibold",
        className,
      )}
      {...props}
    >
      <span className="flex size-full items-center justify-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex size-full items-center justify-center gap-2 pr-2 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-white">
        <span>{text}</span>
        <ArrowRight className="size-4" />
      </div>
    </Component>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };