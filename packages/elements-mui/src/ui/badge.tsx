"use client";

import MuiChip, { type ChipProps as MuiChipProps } from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { alpha, type SxProps, type Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { memo } from "react";
import { cn } from "./cn";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export type BadgeProps = Omit<
  MuiChipProps,
  "variant" | "color" | "size" | "label" | "children"
> & {
  variant?: BadgeVariant;
  children?: ReactNode;
};

const getVariantSx = (variant: BadgeVariant): SxProps<Theme> => {
  switch (variant) {
    case "secondary":
      return {
        bgcolor: "action.selected",
        color: "text.primary",
      };
    case "destructive":
      return {
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? alpha(theme.palette.error.main, 0.6)
            : theme.palette.error.main,
        color: (theme) => theme.palette.error.contrastText,
      };
    case "outline":
      return {
        bgcolor: "transparent",
        color: "text.primary",
      };
    case "default":
    default:
      return {
        bgcolor: "primary.main",
        color: "primary.contrastText",
      };
  }
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
    paddingInline: 0.5,
    paddingBlock: 0,
    lineHeight: 1,
    whiteSpace: "nowrap",
  },
};

export const Badge = memo<BadgeProps>(
  ({ className, variant = "default", children, ...props }) => {
    const mergedSx =
      props.sx != null
        ? ([badgeSx, getVariantSx(variant), props.sx] as MuiChipProps["sx"])
        : ([badgeSx, getVariantSx(variant)] as MuiChipProps["sx"]);

    return (
      <MuiChip
        className={cn(
          "inline-flex items-center justify-center overflow-hidden",
          className
        )}
        label={
          <Typography
            component="span"
            sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
            variant="inherit"
          >
            {children}
          </Typography>
        }
        size="small"
        sx={mergedSx}
        variant={variant === "outline" ? "outlined" : "filled"}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

