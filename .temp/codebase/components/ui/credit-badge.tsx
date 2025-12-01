import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Coins, AlertTriangle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditBadgeProps {
  credits: number;
  isPaid?: boolean;
  variant?: "default" | "outline" | "secondary" | "destructive";
  className?: string;
  showIcon?: boolean;
}

export function CreditBadge({
  credits,
  isPaid = false,
  variant = "default",
  className,
  showIcon = true,
}: CreditBadgeProps) {
  const getVariant = () => {
    if (isPaid) return "secondary";
    if (credits <= 1) return "destructive";
    if (credits <= 2) return "outline";
    return variant;
  };

  const getIcon = () => {
    if (isPaid) return <Zap className="size-3" />;
    if (credits <= 1) return <AlertTriangle className="size-3" />;
    return <Coins className="size-3" />;
  };

  const getText = () => {
    if (isPaid) return "Unlimited";
    if (credits <= 0) return "No credits";
    return `${credits} credit${credits !== 1 ? "s" : ""}`;
  };

  return (
    <Badge
      variant={getVariant()}
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium",
        isPaid && "border-0 bg-gradient-to-r from-zinc-700 to-gray-700 text-white",
        className
      )}
    >
      {showIcon && getIcon()}
      {getText()}
    </Badge>
  );
}
