"use client";

import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { memo } from "react";
import { cn } from "./cn";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";

export type ButtonProps = Omit<MuiButtonProps, "variant" | "size" | "color"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const mapVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case "outline":
      return { variant: "outlined" as const, color: "inherit" as const };
    case "ghost":
    case "link":
      return { variant: "text" as const, color: "inherit" as const };
    case "secondary":
      return { variant: "contained" as const, color: "secondary" as const };
    case "destructive":
      return { variant: "contained" as const, color: "error" as const };
    case "default":
    default:
      return { variant: "contained" as const, color: "primary" as const };
  }
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3",
  lg: "h-10 px-6",
  icon: "h-9 min-w-0 w-9 px-0",
  "icon-sm": "h-8 min-w-0 w-8 px-0",
  "icon-lg": "h-10 min-w-0 w-10 px-0",
};

export const Button = memo<ButtonProps>(
  ({
    className,
    variant = "default",
    size = "default",
    disableElevation = true,
    disableRipple = true,
    ...props
  }) => {
    const mapped = mapVariant(variant);

    return (
      <MuiButton
        className={cn(
          "normal-case",
          variant === "link" && "underline underline-offset-4",
          sizeClasses[size],
          className
        )}
        color={mapped.color}
        disableElevation={disableElevation}
        disableRipple={disableRipple}
        variant={mapped.variant}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

