"use client";

import InputBase, { type InputBaseProps } from "@mui/material/InputBase";
import { forwardRef } from "react";
import { cn } from "./cn";

export type InputProps = InputBaseProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <InputBase
      className={cn(
        "flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm shadow-xs",
        "placeholder:text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        className
      )}
      inputRef={ref}
      {...props}
    />
  )
);

Input.displayName = "Input";

