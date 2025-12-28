"use client";

import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "./ui/cn";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const TaskItemFileRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.action.selected,
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
}));

const TaskTriggerRoot = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

const TaskContentRoot = styled("div")(({ theme }) => ({
  borderLeftColor: alpha(theme.palette.text.secondary, 0.35),
}));

export type TaskItemFileProps = ComponentProps<"div">;

export const TaskItemFile = ({
  children,
  className,
  ...props
}: TaskItemFileProps) => (
  <TaskItemFileRoot
    className={cn(
      "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-xs",
      className
    )}
    {...props}
  >
    {children}
  </TaskItemFileRoot>
);

export type TaskItemProps = ComponentProps<"div">;

export const TaskItem = ({ children, className, ...props }: TaskItemProps) => (
  <Typography
    className={cn(className)}
    color="text.secondary"
    component="div"
    sx={{ fontSize: 14 }}
    variant="body2"
    {...props}
  >
    {children}
  </Typography>
);

export type TaskProps = ComponentProps<typeof Collapsible>;

export const Task = ({
  defaultOpen = true,
  className,
  ...props
}: TaskProps) => (
  <Collapsible className={cn(className)} defaultOpen={defaultOpen} {...props} />
);

export type TaskTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
  title: string;
};

export const TaskTrigger = ({
  children,
  className,
  title,
  ...props
}: TaskTriggerProps) => (
  <CollapsibleTrigger asChild className={cn("group", className)} {...props}>
    {children ?? (
      <TaskTriggerRoot className="flex w-full cursor-pointer items-center gap-2 text-sm transition-colors">
        <SearchIcon className="size-4" />
        <Typography component="p" sx={{ fontSize: 14 }} variant="body2">
          {title}
        </Typography>
        <ChevronDownIcon className="size-4 transition-transform group-data-[state=open]:rotate-180" />
      </TaskTriggerRoot>
    )}
  </CollapsibleTrigger>
);

export type TaskContentProps = ComponentProps<typeof CollapsibleContent>;

export const TaskContent = ({
  children,
  className,
  ...props
}: TaskContentProps) => (
  <CollapsibleContent
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in",
      className
    )}
    {...props}
  >
    <TaskContentRoot className="mt-4 space-y-2 border-l-2 pl-4">
      {children}
    </TaskContentRoot>
  </CollapsibleContent>
);
