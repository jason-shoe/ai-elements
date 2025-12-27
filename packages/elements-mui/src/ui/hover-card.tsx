"use client";

import Popover from "@mui/material/Popover";
import {
  cloneElement,
  type ComponentProps,
  createContext,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "./cn";

type HoverCardContextValue = {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  setOpen: (open: boolean) => void;
  openDelay: number;
  closeDelay: number;
};

const HoverCardContext = createContext<HoverCardContextValue | null>(null);

const useHoverCard = () => {
  const ctx = useContext(HoverCardContext);
  if (!ctx) {
    throw new Error("HoverCard components must be used within HoverCard");
  }
  return ctx;
};

export type HoverCardProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  children?: ReactNode;
} & Omit<ComponentProps<"div">, "children">;

export function HoverCard({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  openDelay = 100,
  closeDelay = 100,
  children,
  ...props
}: HoverCardProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = openProp ?? uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      onOpenChange?.(next);
      if (openProp == null) {
        setUncontrolledOpen(next);
      }
    },
    [onOpenChange, openProp]
  );

  const value = useMemo<HoverCardContextValue>(
    () => ({
      open,
      anchorEl,
      setAnchorEl,
      setOpen,
      openDelay,
      closeDelay,
    }),
    [open, anchorEl, openDelay, closeDelay, setOpen]
  );

  return (
    <HoverCardContext.Provider value={value}>
      <div data-slot="hover-card" {...props}>
        {children}
      </div>
    </HoverCardContext.Provider>
  );
}

export type HoverCardTriggerProps = {
  asChild?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"span">, "children">;

export function HoverCardTrigger({
  asChild = false,
  children,
  ...props
}: HoverCardTriggerProps) {
  const { setAnchorEl, setOpen, openDelay, closeDelay } = useHoverCard();
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const scheduleOpen = (el: HTMLElement) => {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current != null) {
      window.clearTimeout(openTimer.current);
    }
    openTimer.current = window.setTimeout(() => {
      setAnchorEl(el);
      setOpen(true);
    }, openDelay);
  };

  const scheduleClose = () => {
    if (openTimer.current != null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
    }
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  };

  const triggerProps = {
    ...props,
    "data-slot": "hover-card-trigger",
    onMouseEnter: (e: any) => {
      props.onMouseEnter?.(e);
      const el = e.currentTarget as HTMLElement;
      scheduleOpen(el);
    },
    onMouseLeave: (e: any) => {
      props.onMouseLeave?.(e);
      scheduleClose();
    },
    onFocus: (e: any) => {
      props.onFocus?.(e);
      const el = e.currentTarget as HTMLElement;
      scheduleOpen(el);
    },
    onBlur: (e: any) => {
      props.onBlur?.(e);
      scheduleClose();
    },
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<any>;
    return cloneElement(child, {
      ...triggerProps,
      className: cn(child.props?.className, props.className),
    });
  }

  return <span {...triggerProps}>{children}</span>;
}

export type HoverCardContentProps = Omit<
  ComponentProps<typeof Popover>,
  "open" | "anchorEl" | "children"
> & {
  className?: string;
  children?: ReactNode;
};

export function HoverCardContent({
  className,
  children,
  ...props
}: HoverCardContentProps) {
  const { open, anchorEl, setOpen } = useHoverCard();

  if (open && anchorEl == null) {
    return (
      <div
        className={cn("rounded-md border bg-background shadow-md", className)}
        data-slot="hover-card-content"
      >
        {children}
      </div>
    );
  }

  return (
    <Popover
      anchorEl={anchorEl}
      className={className}
      disableRestoreFocus
      onClose={() => setOpen(false)}
      open={open && anchorEl != null}
      slotProps={{
        paper: {
          className: cn("rounded-md border bg-background shadow-md", className),
        },
      }}
      {...props}
    >
      <div data-slot="hover-card-content">{children}</div>
    </Popover>
  );
}

