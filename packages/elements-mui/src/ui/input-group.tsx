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
        "group/input-group relative flex w-full items-center rounded-md border border-border bg-background shadow-xs",
        "h-9 min-w-0 has-[>textarea]:h-auto",
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
        "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none",
        align === "inline-start" && "order-first pl-3",
        align === "inline-end" && "order-last pr-3",
        align === "block-start" &&
          "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3",
        align === "block-end" &&
          "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3",
        className
      )}
      data-align={align}
      data-slot="input-group-addon"
      role="group"
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
    size === "sm"
      ? "sm"
      : size === "icon-sm"
        ? "icon-sm"
        : size === "icon-xs"
          ? "icon-sm"
          : "sm";

  return (
    <Button
      className={cn("shadow-none", className)}
      data-size={size}
      size={mappedSize}
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
      "flex-1 resize-none rounded-none border-0 bg-transparent px-3 py-3 text-sm outline-none",
      className
    )}
    data-slot="input-group-control"
    ref={ref}
    {...props}
  />
));

InputGroupTextarea.displayName = "InputGroupTextarea";

