"use client";

import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
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
import { CodeBlock } from "./code-block";
import { Badge } from "./ui/badge";
import { cn } from "./ui/cn";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

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
  const labels: Record<ToolUIPart["state"], string> = {
    "input-streaming": "Pending",
    "input-available": "Running",
    // @ts-expect-error state only available in AI SDK v6
    "approval-requested": "Awaiting Approval",
    "approval-responded": "Responded",
    "output-available": "Completed",
    "output-error": "Error",
    "output-denied": "Denied",
  };

  const icons: Record<ToolUIPart["state"], ReactNode> = {
    "input-streaming": <CircleIcon className="size-3" />,
    "input-available": <ClockIcon className="size-3 animate-pulse" />,
    // @ts-expect-error state only available in AI SDK v6
    "approval-requested": <ClockIcon className="size-3 text-yellow-600" />,
    "approval-responded": <CheckCircleIcon className="size-3 text-blue-600" />,
    "output-available": <CheckCircleIcon className="size-3 text-green-600" />,
    "output-error": <XCircleIcon className="size-3 text-red-600" />,
    "output-denied": <XCircleIcon className="size-3 text-orange-600" />,
  };

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
}: ToolHeaderProps) => {
  const theme = useTheme();

  return (
    <CollapsibleTrigger
      className={cn(
        "flex w-full items-center justify-between gap-4 p-3",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <WrenchIcon
          className="size-4"
          style={{ color: theme.palette.text.secondary }}
        />
        <Typography
          component="span"
          sx={{ fontWeight: 500, fontSize: 14 }}
          variant="body2"
        >
          {title ?? type.split("-").slice(1).join("-")}
        </Typography>
        {getStatusBadge(state)}
      </div>
      <ChevronDownIcon
        className="size-4 transition-transform group-data-[state=open]:rotate-180"
        style={{ color: theme.palette.text.secondary }}
      />
    </CollapsibleTrigger>
  );
};

export type ToolContentProps = ComponentProps<typeof CollapsibleContent>;

export const ToolContent = ({ className, ...props }: ToolContentProps) => (
  <CollapsibleContent
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in",
      className
    )}
    {...props}
  />
);

export type ToolInputProps = ComponentProps<"div"> & {
  input: ToolUIPart["input"];
};

export const ToolInput = ({ className, input, ...props }: ToolInputProps) => {
  const theme = useTheme();

  return (
    <div className={cn("space-y-2 overflow-hidden p-4", className)} {...props}>
      <Typography
        color="text.secondary"
        component="h4"
        sx={{
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
        variant="caption"
      >
        Parameters
      </Typography>
      <div className="rounded-md" style={{ backgroundColor: theme.palette.action.hover }}>
        <CodeBlock code={JSON.stringify(input, null, 2)} language="json" />
      </div>
    </div>
  );
};

export type ToolOutputProps = ComponentProps<"div"> & {
  output: ToolUIPart["output"];
  errorText: ToolUIPart["errorText"];
};

export const ToolOutput = ({
  className,
  output,
  errorText,
  ...props
}: ToolOutputProps) => {
  const theme = useTheme();

  if (!(output || errorText)) {
    return null;
  }

  let Output = <div>{output as ReactNode}</div>;

  if (typeof output === "object" && !isValidElement(output)) {
    Output = (
      <CodeBlock code={JSON.stringify(output, null, 2)} language="json" />
    );
  } else if (typeof output === "string") {
    Output = <CodeBlock code={output} language="json" />;
  }

  return (
    <div className={cn("space-y-2 p-4", className)} {...props}>
      <Typography
        color="text.secondary"
        component="h4"
        sx={{
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
        variant="caption"
      >
        {errorText ? "Error" : "Result"}
      </Typography>
      <div
        className="overflow-x-auto rounded-md text-xs [&_table]:w-full"
        style={{
          backgroundColor: errorText
            ? alpha(theme.palette.error.main, 0.1)
            : theme.palette.action.hover,
          color: errorText ? theme.palette.error.main : theme.palette.text.primary,
        }}
      >
        {errorText && <div>{errorText}</div>}
        {Output}
      </div>
    </div>
  );
};
