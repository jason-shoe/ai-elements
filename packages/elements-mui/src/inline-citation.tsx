"use client";

import Typography from "@mui/material/Typography";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
  type ComponentProps,
  createContext,
  useCallback,
  useContext,
} from "react";
import { Badge } from "./ui/badge";
import { cn } from "./ui/cn";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const InlineCitationTextRoot = styled(Typography)(({ theme }) => ({
  transitionProperty: "background-color",
  transitionDuration: "150ms",
  ".group:hover &": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const InlineCitationCarouselHeaderRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}));

const InlineCitationQuoteRoot = styled("blockquote")(({ theme }) => ({
  borderLeftColor: alpha(theme.palette.text.secondary, 0.35),
  color: theme.palette.text.secondary,
}));

export type InlineCitationProps = ComponentProps<"span">;

export const InlineCitation = ({
  className,
  ...props
}: InlineCitationProps) => (
  <Typography
    className={cn("group inline items-center gap-1", className)}
    component="span"
    variant="inherit"
    {...props}
  />
);

export type InlineCitationTextProps = ComponentProps<"span">;

export const InlineCitationText = ({
  className,
  ...props
}: InlineCitationTextProps) => (
  <InlineCitationTextRoot
    className={cn("transition-colors", className)}
    variant="inherit"
    {...props}
  />
);

export type InlineCitationCardProps = ComponentProps<typeof HoverCard>;

export const InlineCitationCard = (props: InlineCitationCardProps) => (
  <HoverCard closeDelay={0} openDelay={0} {...props} />
);

export type InlineCitationCardTriggerProps = ComponentProps<typeof Badge> & {
  sources: string[];
};

export const InlineCitationCardTrigger = ({
  sources,
  className,
  ...props
}: InlineCitationCardTriggerProps) => (
  <HoverCardTrigger asChild>
    <Badge
      className={cn("ml-1 rounded-full", className)}
      variant="secondary"
      {...props}
    >
      {sources[0] ? (
        <>
          {new URL(sources[0]).hostname}{" "}
          {sources.length > 1 && `+${sources.length - 1}`}
        </>
      ) : (
        "unknown"
      )}
    </Badge>
  </HoverCardTrigger>
);

export type InlineCitationCardBodyProps = ComponentProps<"div">;

export const InlineCitationCardBody = ({
  className,
  ...props
}: InlineCitationCardBodyProps) => (
  <HoverCardContent className={cn("relative w-80 p-0", className)} {...props} />
);

type InlineCitationCarouselContextValue = {
  onPrev?: () => void;
  onNext?: () => void;
};

const InlineCitationCarouselContext =
  createContext<InlineCitationCarouselContextValue | null>(null);

const useInlineCitationCarousel = () =>
  useContext(InlineCitationCarouselContext);

export type InlineCitationCarouselProps = ComponentProps<"div">;

export const InlineCitationCarousel = ({
  className,
  children,
  ...props
}: InlineCitationCarouselProps) => {
  return (
    <InlineCitationCarouselContext.Provider value={{}}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </InlineCitationCarouselContext.Provider>
  );
};

export type InlineCitationCarouselContentProps = ComponentProps<"div">;

export const InlineCitationCarouselContent = (
  props: InlineCitationCarouselContentProps
) => <div {...props} />;

export type InlineCitationCarouselItemProps = ComponentProps<"div">;

export const InlineCitationCarouselItem = ({
  className,
  ...props
}: InlineCitationCarouselItemProps) => (
  <div
    className={cn("w-full space-y-2 p-4 pl-8", className)}
    {...props}
  />
);

export type InlineCitationCarouselHeaderProps = ComponentProps<"div">;

export const InlineCitationCarouselHeader = ({
  className,
  ...props
}: InlineCitationCarouselHeaderProps) => (
  <InlineCitationCarouselHeaderRoot
    className={cn(
      "flex items-center justify-between gap-2 rounded-t-md p-2",
      className
    )}
    {...props}
  />
);

export type InlineCitationCarouselIndexProps = ComponentProps<"div"> & {
  count: number;
  current: number;
};

export const InlineCitationCarouselIndex = ({
  count,
  current,
  children,
  className,
  ...props
}: InlineCitationCarouselIndexProps) => (
  <Typography
    className={cn("flex flex-1 items-center justify-end px-3 py-1", className)}
    color="text.secondary"
    data-count={count}
    data-current={current}
    component="div"
    sx={{ fontSize: 12 }}
    variant="caption"
    {...props}
  >
    {children ?? `${current}/${count}`}
  </Typography>
);

export type InlineCitationCarouselPrevProps = ComponentProps<"button">;

export const InlineCitationCarouselPrev = ({
  className,
  ...props
}: InlineCitationCarouselPrevProps) => {
  const ctx = useInlineCitationCarousel();
  const theme = useTheme();

  const handleClick = useCallback(() => {
    ctx?.onPrev?.();
  }, [ctx]);

  return (
    <button
      aria-label="Previous"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <ArrowLeftIcon className="size-4" style={{ color: theme.palette.text.secondary }} />
    </button>
  );
};

export type InlineCitationCarouselNextProps = ComponentProps<"button">;

export const InlineCitationCarouselNext = ({
  className,
  ...props
}: InlineCitationCarouselNextProps) => {
  const ctx = useInlineCitationCarousel();
  const theme = useTheme();

  const handleClick = useCallback(() => {
    ctx?.onNext?.();
  }, [ctx]);

  return (
    <button
      aria-label="Next"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <ArrowRightIcon className="size-4" style={{ color: theme.palette.text.secondary }} />
    </button>
  );
};

export type InlineCitationSourceProps = ComponentProps<"div"> & {
  title?: string;
  url?: string;
  description?: string;
};

export const InlineCitationSource = ({
  title,
  url,
  description,
  className,
  children,
  ...props
}: InlineCitationSourceProps) => (
  <div className={cn("space-y-1", className)} {...props}>
    {title && (
      <Typography
        className="truncate leading-tight"
        component="h4"
        sx={{ fontWeight: 500, fontSize: 14 }}
        variant="body2"
      >
        {title}
      </Typography>
    )}
    {url && (
      <Typography
        className="truncate break-all"
        color="text.secondary"
        component="p"
        sx={{ fontSize: 12 }}
        variant="caption"
      >
        {url}
      </Typography>
    )}
    {description && (
      <Typography
        className="line-clamp-3 leading-relaxed"
        color="text.secondary"
        component="p"
        sx={{ fontSize: 14 }}
        variant="body2"
      >
        {description}
      </Typography>
    )}
    {children}
  </div>
);

export type InlineCitationQuoteProps = ComponentProps<"blockquote">;

export const InlineCitationQuote = ({
  children,
  className,
  ...props
}: InlineCitationQuoteProps) => (
  <InlineCitationQuoteRoot
    className={cn(
      "border-l-2 pl-3 text-sm italic",
      className
    )}
    {...props}
  >
    {children}
  </InlineCitationQuoteRoot>
);
