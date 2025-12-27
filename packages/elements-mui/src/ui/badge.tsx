"use client";

import MuiChip, { type ChipProps as MuiChipProps } from "@mui/material/Chip";
import { memo } from "react";
import { cn } from "./cn";

export type BadgeVariant = "default" | "secondary";

export type BadgeProps = Omit<
  MuiChipProps,
  "variant" | "color" | "size" | "label"
> & {
  variant?: BadgeVariant;
  children?: MuiChipProps["label"];
};

export const Badge = memo<BadgeProps>(
  ({ className, variant = "default", children, ...props }) => (
    <MuiChip
      className={cn("h-6", className)}
      color={variant === "secondary" ? "default" : "primary"}
      label={children}
      size="small"
      variant={variant === "secondary" ? "outlined" : "filled"}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

