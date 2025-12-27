"use client";

import Collapse from "@mui/material/Collapse";
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
  useState,
} from "react";
import { cn } from "./cn";

type CollapsibleContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
};

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

const useCollapsible = () => {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error(
      "CollapsibleTrigger/CollapsibleContent must be used within Collapsible"
    );
  }
  return ctx;
};

export type CollapsibleProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
  "data-slot"?: string;
} & Omit<ComponentProps<"div">, "children">;

export function Collapsible({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  asChild = false,
  className,
  children,
  ...props
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (disabled) {
        return;
      }
      onOpenChange?.(next);
      if (openProp == null) {
        setUncontrolledOpen(next);
      }
    },
    [disabled, onOpenChange, openProp]
  );

  const value = useMemo<CollapsibleContextValue>(
    () => ({ open, setOpen, disabled }),
    [open, setOpen, disabled]
  );

  const dataState = open ? "open" : "closed";

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<any>;
    const resolvedDataSlot =
      (props as { "data-slot"?: string })["data-slot"] ??
      (child.props as { "data-slot"?: string })["data-slot"] ??
      "collapsible";
    return (
      <CollapsibleContext.Provider value={value}>
        {cloneElement(child, {
          ...props,
          "data-slot": resolvedDataSlot,
          "data-state": dataState,
          className: cn(child.props?.className, className),
        })}
      </CollapsibleContext.Provider>
    );
  }

  return (
    <CollapsibleContext.Provider value={value}>
      <div
        className={cn(className)}
        data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "collapsible"}
        data-state={dataState}
        {...props}
      >
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

export type CollapsibleTriggerProps = {
  asChild?: boolean;
  children?: ReactNode;
  className?: string;
  "data-slot"?: string;
} & Omit<ComponentProps<"button">, "children" | "type">;

export function CollapsibleTrigger({
  asChild = false,
  className,
  children,
  onClick,
  ...props
}: CollapsibleTriggerProps) {
  const { open, setOpen, disabled } = useCollapsible();
  const dataState = open ? "open" : "closed";

  const handleClick: ComponentProps<"button">["onClick"] = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }
    setOpen(!open);
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<any>;
    const resolvedDataSlot =
      (props as { "data-slot"?: string })["data-slot"] ??
      (child.props as { "data-slot"?: string })["data-slot"] ??
      "collapsible-trigger";
    return (
      cloneElement(child, {
        ...props,
        "aria-disabled": disabled || undefined,
        "data-slot": resolvedDataSlot,
        "data-state": dataState,
        onClick: handleClick,
        className: cn(child.props?.className, className),
      })
    );
  }

  return (
    <button
      aria-disabled={disabled || undefined}
      className={cn(className)}
      data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "collapsible-trigger"}
      data-state={dataState}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export type CollapsibleContentProps = {
  forceMount?: boolean;
  asChild?: boolean;
  children?: ReactNode;
  className?: string;
  "data-slot"?: string;
} & Omit<ComponentProps<"div">, "children">;

export function CollapsibleContent({
  forceMount = false,
  asChild = false,
  className,
  children,
  ...props
}: CollapsibleContentProps) {
  const { open } = useCollapsible();
  const dataState = open ? "open" : "closed";

  if (!forceMount && !open) {
    return null;
  }

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<any>;
    const resolvedDataSlot =
      (props as { "data-slot"?: string })["data-slot"] ??
      (child.props as { "data-slot"?: string })["data-slot"] ??
      "collapsible-content";
    return (
      <Collapse in={open} timeout="auto" unmountOnExit={!forceMount}>
        {cloneElement(child, {
          ...props,
          "data-slot": resolvedDataSlot,
          "data-state": dataState,
          className: cn(child.props?.className, className),
        })}
      </Collapse>
    );
  }

  return (
    <Collapse in={open} timeout="auto" unmountOnExit={!forceMount}>
      <div
        className={cn(className)}
        data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "collapsible-content"}
        data-state={dataState}
        {...props}
      >
        {children}
      </div>
    </Collapse>
  );
}

