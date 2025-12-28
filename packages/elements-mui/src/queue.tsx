"use client";

import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import { ChevronDownIcon, PaperclipIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "./ui/button";
import { cn } from "./ui/cn";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ScrollArea } from "./ui/scroll-area";

const QueueItemRoot = styled("li")(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const QueueItemIndicatorRoot = styled("span", {
  shouldForwardProp: (prop) => prop !== "completed",
})<{ completed?: boolean }>(({ theme, completed }) => ({
  borderColor: alpha(theme.palette.text.secondary, completed ? 0.2 : 0.5),
  backgroundColor: completed
    ? alpha(theme.palette.text.secondary, 0.1)
    : "transparent",
}));

const QueueSectionTriggerButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.text.primary,
  },
}));

const QueueRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.palette.divider,
}));

const QueueItemFileRoot = styled("span")(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  borderColor: theme.palette.divider,
  color: theme.palette.text.secondary,
}));

const QueueItemImageRoot = styled("img")(({ theme }) => ({
  borderColor: theme.palette.divider,
}));

export type QueueMessagePart = {
  type: string;
  text?: string;
  url?: string;
  filename?: string;
  mediaType?: string;
};

export type QueueMessage = {
  id: string;
  parts: QueueMessagePart[];
};

export type QueueTodo = {
  id: string;
  title: string;
  description?: string;
  status?: "pending" | "completed";
};

export type QueueItemProps = ComponentProps<"li">;

export const QueueItem = ({ className, ...props }: QueueItemProps) => (
  <QueueItemRoot
    className={cn(
      "group flex flex-col gap-1 rounded-md px-3 py-1 text-sm transition-colors",
      className
    )}
    {...props}
  />
);

export type QueueItemIndicatorProps = ComponentProps<"span"> & {
  completed?: boolean;
};

export const QueueItemIndicator = ({
  completed = false,
  className,
  ...props
}: QueueItemIndicatorProps) => (
  <QueueItemIndicatorRoot
    className={cn(
      "mt-0.5 inline-block size-2.5 rounded-full border",
      className
    )}
    completed={completed}
    data-completed={completed ? "true" : "false"}
    {...props}
  />
);

export type QueueItemContentProps = ComponentProps<"span"> & {
  completed?: boolean;
};

export const QueueItemContent = ({
  completed = false,
  className,
  ...props
}: QueueItemContentProps) => (
  <Typography
    className={cn("line-clamp-1 grow break-words", completed && "line-through", className)}
    color={completed ? "text.disabled" : "text.secondary"}
    component="span"
    variant="body2"
    {...props}
  />
);

export type QueueItemDescriptionProps = ComponentProps<"div"> & {
  completed?: boolean;
};

export const QueueItemDescription = ({
  completed = false,
  className,
  ...props
}: QueueItemDescriptionProps) => (
  <Typography
    className={cn("ml-6", completed && "line-through", className)}
    color={completed ? "text.disabled" : "text.secondary"}
    component="div"
    sx={{ fontSize: 12 }}
    variant="caption"
    {...props}
  />
);

export type QueueItemActionsProps = ComponentProps<"div">;

export const QueueItemActions = ({
  className,
  ...props
}: QueueItemActionsProps) => (
  <div className={cn("flex gap-1", className)} {...props} />
);

export type QueueItemActionProps = Omit<
  ComponentProps<typeof Button>,
  "variant" | "size"
>;

export const QueueItemAction = ({
  className,
  ...props
}: QueueItemActionProps) => (
  <Button
    className={cn(
      "size-auto rounded p-1 opacity-0 transition-opacity group-hover:opacity-100",
      className
    )}
    size="icon"
    sx={{
      color: "text.secondary",
      "&:hover": {
        bgcolor: "action.hover",
        color: "text.primary",
      },
    }}
    type="button"
    variant="ghost"
    {...props}
  />
);

export type QueueItemAttachmentProps = ComponentProps<"div">;

export const QueueItemAttachment = ({
  className,
  ...props
}: QueueItemAttachmentProps) => (
  <div className={cn("mt-1 flex flex-wrap gap-2", className)} {...props} />
);

export type QueueItemImageProps = ComponentProps<"img">;

export const QueueItemImage = ({
  className,
  ...props
}: QueueItemImageProps) => (
  <QueueItemImageRoot
    alt=""
    className={cn("h-8 w-8 rounded border object-cover", className)}
    height={32}
    width={32}
    {...props}
  />
);

export type QueueItemFileProps = ComponentProps<"span">;

export const QueueItemFile = ({
  children,
  className,
  ...props
}: QueueItemFileProps) => (
  <QueueItemFileRoot
    className={cn(
      "flex items-center gap-1 rounded border px-2 py-1",
      className
    )}
    {...props}
  >
    <PaperclipIcon size={12} />
    <Typography
      className="max-w-[100px] truncate"
      component="span"
      sx={{ fontSize: 12 }}
      variant="caption"
    >
      {children}
    </Typography>
  </QueueItemFileRoot>
);

export type QueueListProps = ComponentProps<typeof ScrollArea>;

export const QueueList = ({
  children,
  className,
  ...props
}: QueueListProps) => (
  <ScrollArea className={cn("-mb-1 mt-2", className)} {...props}>
    <div className="max-h-40 pr-4">
      <ul>{children}</ul>
    </div>
  </ScrollArea>
);

// QueueSection - collapsible section container
export type QueueSectionProps = ComponentProps<typeof Collapsible>;

export const QueueSection = ({
  className,
  defaultOpen = true,
  ...props
}: QueueSectionProps) => (
  <Collapsible className={cn(className)} defaultOpen={defaultOpen} {...props} />
);

// QueueSectionTrigger - section header/trigger
export type QueueSectionTriggerProps = ComponentProps<"button">;

export const QueueSectionTrigger = ({
  children,
  className,
  ...props
}: QueueSectionTriggerProps) => (
  <CollapsibleTrigger asChild>
    <QueueSectionTriggerButton
      className={cn(
        "group flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-medium text-sm transition-colors",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </QueueSectionTriggerButton>
  </CollapsibleTrigger>
);

// QueueSectionLabel - label content with icon and count
export type QueueSectionLabelProps = ComponentProps<"span"> & {
  count?: number;
  label: string;
  icon?: React.ReactNode;
};

export const QueueSectionLabel = ({
  count,
  label,
  icon,
  className,
  ...props
}: QueueSectionLabelProps) => (
  <span className={cn("flex items-center gap-2", className)} {...props}>
    <ChevronDownIcon className="group-data-[state=closed]:-rotate-90 size-4 transition-transform" />
    {icon}
    <Typography component="span" variant="inherit">
      {count} {label}
    </Typography>
  </span>
);

// QueueSectionContent - collapsible content area
export type QueueSectionContentProps = ComponentProps<
  typeof CollapsibleContent
>;

export const QueueSectionContent = ({
  className,
  ...props
}: QueueSectionContentProps) => (
  <CollapsibleContent className={cn(className)} {...props} />
);

export type QueueProps = ComponentProps<"div">;

export const Queue = ({ className, ...props }: QueueProps) => (
  <QueueRoot
    className={cn(
      "flex flex-col gap-2 rounded-xl border px-3 pt-2 pb-2 shadow-xs",
      className
    )}
    {...props}
  />
);
