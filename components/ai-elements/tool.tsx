import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { ToolUIPart } from "ai";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  CircleIcon,
  ClockIcon,
  WrenchIcon,
  XCircleIcon,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { isValidElement } from "react";
import { CodeBlock, CodeBlockCopyButton } from "./code-block";
import { getHighlighter } from "@/lib/shiki"; // Import the highlighter

export type ToolProps = ComponentProps<typeof Collapsible>;

export const Tool = ({ className, ...props }: ToolProps) => (
  <Collapsible
    className={cn("not-prose mb-4 w-full rounded-md border", className)}
    {...props}
  />
);

export type ToolHeaderProps = {
  title?: string;
  type: ToolUIPart["type"];
  state: ToolUIPart["state"];
  className?: string;
};

const getStatusBadge = (status: ToolUIPart["state"]) => {
  const labels = {
    "input-streaming": "Pending",
    "input-available": "Running",
    "output-available": "Completed",
    "output-error": "Error",
  } as const;

  const icons = {
    "input-streaming": <CircleIcon className="size-4" />,
    "input-available": <ClockIcon className="size-4 animate-pulse" />,
    "output-available": <CheckCircleIcon className="size-4 text-green-600" />,
    "output-error": <XCircleIcon className="size-4 text-red-600" />,
  } as const;

  return (
    <Badge className="gap-1.5 rounded-full text-xs" variant="secondary">
      {icons[status]}
      {labels[status]}
    </Badge>
  );
};

export const ToolHeader = ({
  className,
  title,
  type,
  state,
  ...props
}: ToolHeaderProps) => (
  <CollapsibleTrigger
    className={cn(
      "flex w-full items-center justify-between gap-4 p-3",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">
      <WrenchIcon className="size-4 text-muted-foreground" />
      <span className="text-sm font-medium">
        {title ?? type.split("-").slice(1).join("-")}
      </span>
      {getStatusBadge(state)}
    </div>
    <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
  </CollapsibleTrigger>
);

export type ToolContentProps = ComponentProps<typeof CollapsibleContent>;

export const ToolContent = ({ className, ...props }: ToolContentProps) => (
  <CollapsibleContent
    className={cn(
      "text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2",
      className
    )}
    {...props}
  />
);

export type ToolInputProps = ComponentProps<"div"> & {
  input: ToolUIPart["input"];
};

export const ToolInput = async ({ className, input, ...props }: ToolInputProps) => {
  const highlighter = await getHighlighter();
  const codeString = JSON.stringify(input, null, 2);
  const highlightedHtml = await highlighter.codeToHtml(codeString, {
    lang: "json",
    theme: 'nord' // Using 'nord' as the theme as per instructions
  });

  return (
    <div className={cn("space-y-2 overflow-hidden p-4", className)} {...props}>
      <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Parameters
      </h4>
      <div className="rounded-md bg-muted/50">
        <CodeBlock code={codeString} highlightedHtml={highlightedHtml} />
      </div>
    </div>
  );
};

export type ToolOutputProps = ComponentProps<"div"> & {
  output: ToolUIPart["output"];
  errorText: ToolUIPart["errorText"];
};

export const ToolOutput = async ({
  className,
  output,
  errorText,
  ...props
}: ToolOutputProps) => {
  if (!(output || errorText)) {
    return null;
  }

  const highlighter = await getHighlighter();
  let Output: ReactNode;
  let codeString: string;
  let language = "json"; // Default language for output

  if (typeof output === "object" && !isValidElement(output)) {
    codeString = JSON.stringify(output, null, 2);
  } else if (typeof output === "string") {
    codeString = output;
    // Attempt to infer language if not JSON, e.g., if it's an XML string or plain text
    if (codeString.startsWith("<") && codeString.endsWith(">")) {
      language = "xml";
    } else {
      language = "text";
    }
  } else {
    codeString = String(output);
    language = "text";
  }

  const highlightedHtml = await highlighter.codeToHtml(codeString, {
    lang: language,
    theme: 'nord' // Using 'nord' as the theme as per instructions
  });

  Output = (
    <CodeBlock code={codeString} highlightedHtml={highlightedHtml} />
  );


  return (
    <div className={cn("space-y-2 p-4", className)} {...props}>
      <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {errorText ? "Error" : "Result"}
      </h4>
      <div
        className={cn(
          "overflow-x-auto rounded-md text-xs [&_table]:w-full",
          errorText
            ? "bg-destructive/10 text-destructive"
            : "bg-muted/50 text-foreground"
        )}
      >
        {errorText && <div>{errorText}</div>}
        {Output}
      </div>
    </div>
  );
};
