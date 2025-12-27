"use client";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "./cn";

export function InputGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
        "h-9 min-w-0 has-[>textarea]:h-auto",

        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",

        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",

        // Error state.
        "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
        className
      )}
      data-slot="input-group"
      role="group"
      {...props}
    />
  );
}

export type InputGroupAddonProps = ComponentProps<"div"> & {
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
};

export function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      className={cn(
        "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 font-medium text-sm select-none [&>svg:not([class*='size-'])]:size-4 group-data-[disabled=true]/input-group:opacity-50",
        align === "inline-start" &&
          "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        align === "inline-end" &&
          "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        align === "block-start" &&
          "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
        align === "block-end" &&
          "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5",
        className
      )}
      data-align={align}
      data-slot="input-group-addon"
      role="group"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        const parent = e.currentTarget.parentElement;
        if (parent == null) {
          return;
        }
        const control = parent.querySelector(
          '[data-slot="input-group-control"]'
        ) as HTMLElement | null;
        control?.focus();
      }}
      {...props}
    />
  );
}

export type InputGroupButtonProps = Omit<ButtonProps, "size"> & {
  size?: "xs" | "sm" | "icon-xs" | "icon-sm";
};

export function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: InputGroupButtonProps) {
  const mappedSize =
    size === "icon-sm" ? "icon-sm" : size === "sm" ? "sm" : "sm";

  const sizeClassName =
    size === "xs"
      ? "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2"
      : size === "sm"
        ? "h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5"
        : size === "icon-xs"
          ? "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0"
          : "size-8 p-0 has-[>svg]:p-0";

  const sizeSx =
    size === "xs"
      ? { minWidth: 0, height: 24, px: 1 }
      : size === "sm"
        ? { minWidth: 0, height: 32, px: 1.25 }
        : size === "icon-xs"
          ? { minWidth: 0, width: 24, height: 24, p: 0 }
          : { minWidth: 0, width: 32, height: 32, p: 0 };

  return (
    <Button
      className={cn(
        "shadow-none flex items-center gap-2 text-sm",
        sizeClassName,
        className
      )}
      data-size={size}
      size={mappedSize}
      sx={sizeSx}
      type={type}
      variant={variant}
      {...props}
    />
  );
}

export type InputGroupTextareaProps = ComponentProps<typeof TextareaAutosize>;

export const InputGroupTextarea = forwardRef<
  HTMLTextAreaElement,
  InputGroupTextareaProps
>(({ className, ...props }, ref) => (
  <TextareaAutosize
    className={cn(
      "flex-1 resize-none rounded-none border-0 bg-transparent px-3 py-3 text-sm shadow-none outline-none focus-visible:ring-0 dark:bg-transparent",
      className
    )}
    data-slot="input-group-control"
    ref={ref}
    {...props}
  />
));

InputGroupTextarea.displayName = "InputGroupTextarea";

