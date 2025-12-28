"use client";

import MuiTooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { type LucideIcon, XIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";
import { Button } from "./ui/button";
import { cn } from "./ui/cn";

const ArtifactRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.palette.divider,
}));

const ArtifactHeaderRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  borderColor: theme.palette.divider,
}));

export type ArtifactProps = HTMLAttributes<HTMLDivElement>;

export const Artifact = ({ className, ...props }: ArtifactProps) => (
  <ArtifactRoot
    className={cn(
      "flex flex-col overflow-hidden rounded-lg border shadow-sm",
      className
    )}
    {...props}
  />
);

export type ArtifactHeaderProps = HTMLAttributes<HTMLDivElement>;

export const ArtifactHeader = ({
  className,
  ...props
}: ArtifactHeaderProps) => (
  <ArtifactHeaderRoot
    className={cn(
      "flex items-center justify-between border-b px-4 py-3",
      className
    )}
    {...props}
  />
);

export type ArtifactCloseProps = ComponentProps<typeof Button>;

export const ArtifactClose = ({
  className,
  children,
  size = "sm",
  variant = "ghost",
  ...props
}: ArtifactCloseProps) => (
  <Button
    className={cn("size-8 p-0", className)}
    size={size}
    sx={{
      color: "text.secondary",
      "&:hover": { color: "text.primary" },
    }}
    type="button"
    variant={variant}
    {...props}
  >
    {children ?? <XIcon className="size-4" />}
    <span className="sr-only">Close</span>
  </Button>
);

export type ArtifactTitleProps = HTMLAttributes<HTMLParagraphElement>;

export const ArtifactTitle = ({ className, ...props }: ArtifactTitleProps) => (
  <Typography
    className={cn(className)}
    color="text.primary"
    component="p"
    sx={{ fontWeight: 500, fontSize: 14 }}
    variant="body2"
    {...props}
  />
);

export type ArtifactDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const ArtifactDescription = ({
  className,
  ...props
}: ArtifactDescriptionProps) => (
  <Typography
    className={cn(className)}
    color="text.secondary"
    component="p"
    sx={{ fontSize: 14 }}
    variant="body2"
    {...props}
  />
);

export type ArtifactActionsProps = HTMLAttributes<HTMLDivElement>;

export const ArtifactActions = ({
  className,
  ...props
}: ArtifactActionsProps) => (
  <div className={cn("flex items-center gap-1", className)} {...props} />
);

export type ArtifactActionProps = ComponentProps<typeof Button> & {
  tooltip?: string;
  label?: string;
  icon?: LucideIcon;
};

export const ArtifactAction = ({
  tooltip,
  label,
  icon: Icon,
  children,
  className,
  size = "sm",
  variant = "ghost",
  ...props
}: ArtifactActionProps) => {
  const button = (
    <Button
      className={cn("size-8 p-0", className)}
      size={size}
      sx={{
        color: "text.secondary",
        "&:hover": { color: "text.primary" },
      }}
      type="button"
      variant={variant}
      {...props}
    >
      {Icon ? <Icon className="size-4" /> : children}
      <span className="sr-only">{label || tooltip}</span>
    </Button>
  );

  if (tooltip) {
    return (
      <MuiTooltip title={tooltip}>
        <span>{button}</span>
      </MuiTooltip>
    );
  }

  return button;
};

export type ArtifactContentProps = HTMLAttributes<HTMLDivElement>;

export const ArtifactContent = ({
  className,
  ...props
}: ArtifactContentProps) => (
  <div className={cn("flex-1 overflow-auto p-4", className)} {...props} />
);
