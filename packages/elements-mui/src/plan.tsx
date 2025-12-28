"use client";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { ChevronsUpDownIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { createContext, useContext } from "react";
import { Shimmer } from "./shimmer";
import { Button } from "./ui/button";
import { cn } from "./ui/cn";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

type PlanContextValue = {
  isStreaming: boolean;
};

const PlanContext = createContext<PlanContextValue | null>(null);

const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("Plan components must be used within Plan");
  }
  return context;
};

export type PlanProps = ComponentProps<typeof Collapsible> & {
  isStreaming?: boolean;
};

export const Plan = ({
  className,
  isStreaming = false,
  children,
  ...props
}: PlanProps) => (
  <PlanContext.Provider value={{ isStreaming }}>
    <Collapsible asChild data-slot="plan" {...props}>
      <Card className={cn("shadow-none", className)} variant="outlined">
        {children}
      </Card>
    </Collapsible>
  </PlanContext.Provider>
);

export type PlanHeaderProps = ComponentProps<"div">;

export const PlanHeader = ({ className, ...props }: PlanHeaderProps) => (
  <div
    className={cn("flex items-start justify-between gap-2 p-6 pb-0", className)}
    data-slot="plan-header"
    {...props}
  />
);

export type PlanTitleProps = Omit<
  ComponentProps<"h3">,
  "children"
> & {
  children: string;
};

export const PlanTitle = ({ children, ...props }: PlanTitleProps) => {
  const { isStreaming } = usePlan();

  return (
    <h3 className="font-semibold text-base leading-none" data-slot="plan-title" {...props}>
      {isStreaming ? <Shimmer as="span">{children}</Shimmer> : children}
    </h3>
  );
};

export type PlanDescriptionProps = Omit<
  ComponentProps<"p">,
  "children"
> & {
  children: string;
};

export const PlanDescription = ({
  className,
  children,
  ...props
}: PlanDescriptionProps) => {
  const { isStreaming } = usePlan();

  return (
    <Typography
      className={cn("text-balance", className)}
      color="text.secondary"
      data-slot="plan-description"
      component="p"
      sx={{ fontSize: 14 }}
      variant="body2"
      {...props}
    >
      {isStreaming ? <Shimmer as="span">{children}</Shimmer> : children}
    </Typography>
  );
};

export type PlanActionProps = ComponentProps<"div">;

export const PlanAction = (props: PlanActionProps) => (
  <div data-slot="plan-action" {...props} />
);

export type PlanContentProps = ComponentProps<"div">;

export const PlanContent = (props: PlanContentProps) => (
  <CollapsibleContent asChild>
    <div className="p-6" data-slot="plan-content" {...props} />
  </CollapsibleContent>
);

export type PlanFooterProps = ComponentProps<"div">;

export const PlanFooter = (props: PlanFooterProps) => (
  <div className="p-6 pt-0" data-slot="plan-footer" {...props} />
);

export type PlanTriggerProps = ComponentProps<typeof CollapsibleTrigger>;

export const PlanTrigger = ({ className, ...props }: PlanTriggerProps) => (
  <CollapsibleTrigger asChild>
    <Button
      className={cn("size-8", className)}
      data-slot="plan-trigger"
      size="icon"
      variant="ghost"
      {...props}
    >
      <ChevronsUpDownIcon className="size-4" />
      <span className="sr-only">Toggle plan</span>
    </Button>
  </CollapsibleTrigger>
);
