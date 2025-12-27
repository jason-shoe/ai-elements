"use client";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { MenuProps } from "@mui/material/Menu";
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

type DropdownMenuContextValue = {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  setOpen: (open: boolean) => void;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

const useDropdownMenu = () => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) {
    throw new Error(
      "DropdownMenuTrigger/DropdownMenuContent must be used within DropdownMenu"
    );
  }
  return ctx;
};

export type DropdownMenuProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
} & Omit<ComponentProps<"div">, "children">;

export function DropdownMenu({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = openProp ?? uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      onOpenChange?.(next);
      if (openProp == null) {
        setUncontrolledOpen(next);
      }
      if (!next) {
        setAnchorEl(null);
      }
    },
    [onOpenChange, openProp]
  );

  const value = useMemo<DropdownMenuContextValue>(
    () => ({ open, anchorEl, setAnchorEl, setOpen }),
    [open, anchorEl, setOpen]
  );

  return (
    <DropdownMenuContext.Provider value={value}>
      <div data-slot="dropdown-menu" {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export type DropdownMenuTriggerProps = {
  asChild?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "children" | "type">;

export function DropdownMenuTrigger({
  asChild = false,
  children,
  onClick,
  className,
  ...props
}: DropdownMenuTriggerProps) {
  const { open, setAnchorEl, setOpen } = useDropdownMenu();

  const handleClick: ComponentProps<"button">["onClick"] = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }
    setAnchorEl(event.currentTarget as HTMLElement);
    setOpen(!open);
  };

  const triggerProps = {
    ...props,
    className,
    "data-slot": "dropdown-menu-trigger",
    "aria-haspopup": "menu" as const,
    "aria-expanded": open || undefined,
    onClick: handleClick,
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<any>;
    return cloneElement(child, {
      ...triggerProps,
      className: cn(child.props?.className, className),
    });
  }

  return (
    <button type="button" {...triggerProps}>
      {children}
    </button>
  );
}

export type DropdownMenuContentProps = Omit<
  MenuProps,
  "open" | "anchorEl" | "children"
> & {
  className?: string;
  children?: ReactNode;
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

export function DropdownMenuContent({
  className,
  children,
  align = "center",
  sideOffset,
  ...props
}: DropdownMenuContentProps) {
  const { open, anchorEl, setOpen } = useDropdownMenu();
  const resolvedAnchorEl =
    anchorEl ??
    (open && typeof document !== "undefined" ? document.body : null);

  const anchorOrigin =
    align === "start"
      ? { vertical: "bottom" as const, horizontal: "left" as const }
      : align === "end"
        ? { vertical: "bottom" as const, horizontal: "right" as const }
        : { vertical: "bottom" as const, horizontal: "center" as const };
  const transformOrigin =
    align === "start"
      ? { vertical: "top" as const, horizontal: "left" as const }
      : align === "end"
        ? { vertical: "top" as const, horizontal: "right" as const }
        : { vertical: "top" as const, horizontal: "center" as const };

  return (
    <Menu
      anchorEl={resolvedAnchorEl}
      anchorOrigin={anchorOrigin}
      className={className}
      onClose={() => setOpen(false)}
      open={open && resolvedAnchorEl != null}
      slotProps={{
        paper: {
          className: cn("rounded-md border bg-background shadow-md", className),
          style: sideOffset ? { marginTop: sideOffset } : undefined,
        },
      }}
      transformOrigin={transformOrigin}
      {...props}
    >
      {children}
    </Menu>
  );
}

export type DropdownMenuItemProps = Omit<
  ComponentProps<typeof MenuItem>,
  "children" | "onClick"
> & {
  asChild?: boolean;
  onSelect?: (event: Event) => void;
  children?: ReactNode;
};

export function DropdownMenuItem({
  asChild = false,
  className,
  children,
  onSelect,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenu();

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<any>;
    const { onClick: childOnClick, className: childClassName, ...childRest } =
      child.props ?? {};
    return (
      <MenuItem
        className={cn(childClassName, className)}
        component={child.type}
        onClick={(e) => {
          childOnClick?.(e);
          const selectEvent = e.nativeEvent;
          onSelect?.(selectEvent);
          if (!selectEvent.defaultPrevented) {
            setOpen(false);
          }
        }}
        {...childRest}
        {...props}
      >
        {child.props?.children}
      </MenuItem>
    );
  }

  return (
    <MenuItem
      className={cn(className)}
      onClick={(e) => {
        const selectEvent = e.nativeEvent;
        onSelect?.(selectEvent);
        if (!selectEvent.defaultPrevented) {
          setOpen(false);
        }
      }}
      {...props}
    >
      {children}
    </MenuItem>
  );
}

export type DropdownMenuSeparatorProps = ComponentProps<"hr">;

export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <hr
      className={cn("my-1 border-border", className)}
      data-slot="dropdown-menu-separator"
      role="separator"
      {...props}
    />
  );
}

export type DropdownMenuLabelProps = ComponentProps<"div">;

export function DropdownMenuLabel({ className, ...props }: DropdownMenuLabelProps) {
  return (
    <div
      className={cn("px-2 py-1.5 font-medium text-sm", className)}
      data-slot="dropdown-menu-label"
      {...props}
    />
  );
}

