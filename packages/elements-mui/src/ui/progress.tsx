"use client";

import LinearProgress from "@mui/material/LinearProgress";
import type { LinearProgressProps } from "@mui/material/LinearProgress";
import type { SxProps, Theme } from "@mui/material/styles";
import { memo } from "react";
import { cn } from "./cn";

export type ProgressProps = Omit<LinearProgressProps, "variant" | "value"> & {
  value?: number;
  className?: string;
};

const progressSx: SxProps<Theme> = {
  height: 8,
  borderRadius: 9999,
  bgcolor: "action.hover",
  "& .MuiLinearProgress-bar": {
    borderRadius: 9999,
  },
};

export const Progress = memo<ProgressProps>(({ className, value, sx, ...props }) => {
  const mergedSx = sx != null ? ([progressSx, sx] as LinearProgressProps["sx"]) : progressSx;

  return (
    <LinearProgress
      className={cn("h-2 rounded", className)}
      sx={mergedSx}
      value={value}
      variant={value == null ? "indeterminate" : "determinate"}
      {...props}
    />
  );
});

Progress.displayName = "Progress";

