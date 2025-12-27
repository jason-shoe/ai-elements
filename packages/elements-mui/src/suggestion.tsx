"use client";

import type { ComponentProps } from "react";
import Chip from "@mui/material/Chip";
import { cn } from "./ui/cn";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export type SuggestionsProps = ComponentProps<typeof ScrollArea>;

export const Suggestions = ({
  className,
  children,
  ...props
}: SuggestionsProps) => (
  <ScrollArea className="w-full overflow-x-auto whitespace-nowrap" {...props}>
    <div className={cn("flex w-max flex-nowrap items-center gap-2", className)}>
      {children}
    </div>
    <ScrollBar className="hidden" orientation="horizontal" />
  </ScrollArea>
);

export type SuggestionProps = Omit<ComponentProps<typeof Chip>, "onClick"> & {
  suggestion: string;
  onClick?: (suggestion: string) => void;
};

export const Suggestion = ({
  suggestion,
  onClick,
  className,
  variant = "outlined",
  size = "small",
  children,
  ...props
}: SuggestionProps) => {
  const handleClick = () => {
    onClick?.(suggestion);
  };

  return (
    <Chip
      className={cn("cursor-pointer rounded-full px-4", className)}
      component="button"
      disabled={props.disabled}
      label={children ?? suggestion}
      onClick={handleClick}
      size={size}
      type="button"
      variant={variant}
      {...props}
    />
  );
};
