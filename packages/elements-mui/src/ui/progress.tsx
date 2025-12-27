"use client";

import LinearProgress from "@mui/material/LinearProgress";
import type { LinearProgressProps } from "@mui/material/LinearProgress";
import { memo } from "react";
import { cn } from "./cn";

export type ProgressProps = Omit<LinearProgressProps, "variant" | "value"> & {
  value?: number;
  className?: string;
};

export const Progress = memo<ProgressProps>(({ className, value, ...props }) => (
  <LinearProgress
    className={cn("h-2 rounded", className)}
    value={value}
    variant={value == null ? "indeterminate" : "determinate"}
    {...props}
  />
));

Progress.displayName = "Progress";

