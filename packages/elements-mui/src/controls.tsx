"use client";

import { Controls as ControlsPrimitive } from "@xyflow/react";
import { styled } from "@mui/material/styles";
import type { ComponentProps } from "react";
import { cn } from "./ui/cn";

export type ControlsProps = ComponentProps<typeof ControlsPrimitive>;

const ControlsRoot = styled(ControlsPrimitive)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.palette.divider,
  "& > button:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const Controls = ({ className, ...props }: ControlsProps) => (
  <ControlsRoot
    className={cn(
      "gap-px overflow-hidden rounded-md border p-1 shadow-none!",
      "[&>button]:rounded-md [&>button]:border-none! [&>button]:bg-transparent!",
      className
    )}
    {...props}
  />
);
