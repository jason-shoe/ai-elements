"use client";

import MuiChip, { type ChipProps as MuiChipProps } from "@mui/material/Chip";
import type { SxProps, Theme } from "@mui/material/styles";
import { memo } from "react";
import { cn } from "./cn";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export type BadgeProps = Omit<
  MuiChipProps,
  "variant" | "color" | "size" | "label"
> & {
  variant?: BadgeVariant;
  children?: MuiChipProps["label"];
};

const variantClassName: Record<BadgeVariant, string> = {
  default: "border-transparent bg-primary text-primary-foreground",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  destructive: "border-transparent bg-destructive text-white dark:bg-destructive/60",
  outline: "bg-transparent text-foreground",
};

const badgeSx: SxProps<Theme> = {
  height: 20,
  borderRadius: 9999,
  fontSize: 12,
  fontWeight: 500,
  maxWidth: "100%",
  "& .MuiChip-label": {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    paddingInline: 8,
    paddingBlock: 0,
    lineHeight: 1,
    whiteSpace: "nowrap",
  },
};

export const Badge = memo<BadgeProps>(
  ({ className, variant = "default", children, ...props }) => (
    <MuiChip
      className={cn(
        "inline-flex items-center justify-center overflow-hidden",
        variantClassName[variant],
        className
      )}
      label={<span className="inline-flex items-center gap-1">{children}</span>}
      size="small"
      sx={[badgeSx, props.sx]}
      variant={variant === "outline" ? "outlined" : "filled"}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

