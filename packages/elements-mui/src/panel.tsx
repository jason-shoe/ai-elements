import { Panel as PanelPrimitive } from "@xyflow/react";
import { styled } from "@mui/material/styles";
import type { ComponentProps } from "react";
import { cn } from "./ui/cn";

type PanelProps = ComponentProps<typeof PanelPrimitive>;

const PanelRoot = styled(PanelPrimitive)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.palette.divider,
}));

export const Panel = ({ className, ...props }: PanelProps) => (
  <PanelRoot
    className={cn(
      "m-4 overflow-hidden rounded-md border p-1",
      className
    )}
    {...props}
  />
);
