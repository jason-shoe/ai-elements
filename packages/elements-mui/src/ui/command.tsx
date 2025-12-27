"use client";

import type { ComponentProps } from "react";
import { cn } from "./cn";

export type CommandProps = ComponentProps<"div">;

export function Command({ className, ...props }: CommandProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md border bg-background text-foreground",
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
      <input
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none",
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
        <div className="px-2 py-1.5 text-muted-foreground text-xs font-medium">
          {heading}
        </div>
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
    <hr
      className={cn("bg-border -mx-1 my-1 h-px border-0", className)}
      data-slot="command-separator"
      role="separator"
      {...props}
    />
  );
}

export type CommandShortcutProps = ComponentProps<"span">;

export function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <span
      className={cn("ml-auto text-muted-foreground text-xs tracking-widest", className)}
      data-slot="command-shortcut"
      {...props}
    />
  );
}

