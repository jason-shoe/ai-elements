"use client";

import InputBase, { type InputBaseProps } from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import { forwardRef } from "react";
import { cn } from "./cn";

export type InputProps = InputBaseProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, sx, ...props }, ref) => (
    <InputBase
      className={cn(
        "flex h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs",
        className
      )}
      inputRef={ref}
      sx={[
        {
          borderColor: "divider",
          "&:hover": { borderColor: "text.secondary" },
          "&.Mui-focused": {
            borderColor: "primary.main",
            boxShadow: (theme) =>
              `0 0 0 3px ${alpha(theme.palette.primary.main, 0.25)}`,
          },
          "& input::placeholder": {
            color: "text.secondary",
            opacity: 1,
          },
        },
        ...(Array.isArray(sx) ? sx : sx != null ? [sx] : []),
      ]}
      {...props}
    />
  )
);

Input.displayName = "Input";

