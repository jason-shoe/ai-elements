import { NodeToolbar, Position } from "@xyflow/react";
import { useTheme } from "@mui/material/styles";
import type { ComponentProps } from "react";
import { cn } from "./ui/cn";

type ToolbarProps = ComponentProps<typeof NodeToolbar>;

export const Toolbar = ({ className, style, ...props }: ToolbarProps) => {
  const theme = useTheme();

  return (
    <NodeToolbar
      className={cn("flex items-center gap-1 rounded-sm border p-1.5", className)}
      position={Position.Bottom}
      style={{
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        ...style,
      }}
      {...props}
    />
  );
};
