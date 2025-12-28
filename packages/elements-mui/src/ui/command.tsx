"use client";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import type { ComponentProps } from "react";
import { cn } from "./cn";

const CommandRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
}));

const CommandInputField = styled("input")(({ theme }) => ({
  "&::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
}));

const CommandSeparatorRoot = styled("hr")(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  border: 0,
}));

export type CommandProps = ComponentProps<"div">;

export function Command({ className, ...props }: CommandProps) {
  return (
    <CommandRoot
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md border",
        className
      )}
      data-slot="command"
      {...props}
    />
  );
}

export type CommandInputProps = ComponentProps<"input">;

export function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div
      className="flex h-9 items-center gap-2 border-b px-3"
      data-slot="command-input-wrapper"
    >
      <CommandInputField
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none",
          className
        )}
        data-slot="command-input"
        {...props}
      />
    </div>
  );
}

export type CommandListProps = ComponentProps<"div">;

export function CommandList({ className, ...props }: CommandListProps) {
  return (
    <div
      className={cn("max-h-[300px] overflow-x-hidden overflow-y-auto", className)}
      data-slot="command-list"
      {...props}
    />
  );
}

export type CommandEmptyProps = ComponentProps<"div">;

export function CommandEmpty({ className, ...props }: CommandEmptyProps) {
  return (
    <div
      className={cn("py-6 text-center text-sm", className)}
      data-slot="command-empty"
      {...props}
    />
  );
}

export type CommandGroupProps = ComponentProps<"div"> & { heading?: string };

export function CommandGroup({ className, heading, children, ...props }: CommandGroupProps) {
  return (
    <div className={cn("overflow-hidden p-1", className)} data-slot="command-group" {...props}>
      {heading ? (
        <Typography
          className="px-2 py-1.5 font-medium"
          color="text.secondary"
          component="div"
          sx={{ fontSize: 12 }}
          variant="caption"
        >
          {heading}
        </Typography>
      ) : null}
      <div>{children}</div>
    </div>
  );
}

export type CommandItemProps = ComponentProps<"div"> & {
  disabled?: boolean;
  onSelect?: (value: string) => void;
  value?: string;
};

export function CommandItem({
  className,
  disabled,
  onClick,
  onSelect,
  value = "",
  ...props
}: CommandItemProps) {
  return (
    <div
      aria-disabled={disabled || undefined}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      data-slot="command-item"
      onClick={(e) => {
        onClick?.(e);
        if (!disabled) {
          onSelect?.(value);
        }
      }}
      role="option"
      {...props}
    />
  );
}

export type CommandSeparatorProps = ComponentProps<"hr">;

export function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  return (
    <CommandSeparatorRoot
      className={cn("-mx-1 my-1 h-px", className)}
      data-slot="command-separator"
      role="separator"
      {...props}
    />
  );
}

export type CommandShortcutProps = ComponentProps<"span">;

export function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <Typography
      className={cn("ml-auto tracking-widest", className)}
      color="text.secondary"
      data-slot="command-shortcut"
      component="span"
      sx={{ fontSize: 12 }}
      variant="caption"
      {...props}
    />
  );
}

