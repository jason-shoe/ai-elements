"use client";

import type { ComponentProps } from "react";
import { cn } from "./cn";

export type ScrollAreaProps = ComponentProps<"div">;

export const ScrollArea = ({ className, ...props }: ScrollAreaProps) => (
  <div className={cn("overflow-auto", className)} {...props} />
);

export type ScrollBarProps = ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
};

// Presentational no-op: kept for API compatibility.
export const ScrollBar = ({ className, ...props }: ScrollBarProps) => (
  <div
    aria-hidden="true"
    className={cn("pointer-events-none", className)}
    {...props}
  />
);

