"use client";

import type { ComponentProps, ReactNode } from "react";
import { Button } from "./ui/button";
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

export type SuggestionProps = Omit<
  ComponentProps<typeof Button>,
  "onClick" | "children" | "type" | "size" | "variant"
> & {
  suggestion: string;
  onClick?: (suggestion: string) => void;
  children?: ReactNode;
};

export const Suggestion = ({
  suggestion,
  onClick,
  className,
  children,
  ...props
}: SuggestionProps) => {
  const handleClick = () => {
    onClick?.(suggestion);
  };

  return (
    <Button
      className={cn("shrink-0 rounded-full", className)}
      onClick={handleClick}
      size="sm"
      type="button"
      variant="outline"
      {...props}
    >
      {children ?? suggestion}
    </Button>
  );
};
