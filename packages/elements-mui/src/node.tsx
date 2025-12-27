import MuiCard from "@mui/material/Card";
import { Handle, Position } from "@xyflow/react";
import type { ComponentProps } from "react";
import { cn } from "./ui/cn";

export type NodeProps = ComponentProps<typeof MuiCard> & {
  handles: {
    target: boolean;
    source: boolean;
  };
};

export const Node = ({ handles, className, ...props }: NodeProps) => (
  <MuiCard
    className={cn(
      "node-container relative size-full h-auto w-sm gap-0 rounded-md p-0",
      className
    )}
    variant="outlined"
    {...props}
  >
    {handles.target && <Handle position={Position.Left} type="target" />}
    {handles.source && <Handle position={Position.Right} type="source" />}
    {props.children}
  </MuiCard>
);

export type NodeHeaderProps = ComponentProps<"div">;

export const NodeHeader = ({ className, ...props }: NodeHeaderProps) => (
  <div
    className={cn("rounded-t-md border-b bg-secondary p-3", className)}
    {...props}
  />
);

export type NodeTitleProps = ComponentProps<"h3">;

export const NodeTitle = ({ className, ...props }: NodeTitleProps) => (
  <h3 className={cn("font-semibold text-sm leading-none", className)} {...props} />
);

export type NodeDescriptionProps = ComponentProps<"p">;

export const NodeDescription = (props: NodeDescriptionProps) => (
  <p className="text-muted-foreground text-xs" {...props} />
);

export type NodeActionProps = ComponentProps<"div">;

export const NodeAction = (props: NodeActionProps) => (
  <div {...props} />
);

export type NodeContentProps = ComponentProps<"div">;

export const NodeContent = ({ className, ...props }: NodeContentProps) => (
  <div className={cn("p-3", className)} {...props} />
);

export type NodeFooterProps = ComponentProps<"div">;

export const NodeFooter = ({ className, ...props }: NodeFooterProps) => (
  <div className={cn("rounded-b-md border-t bg-secondary p-3", className)} {...props} />
);
