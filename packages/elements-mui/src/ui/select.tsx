"use client";

import Popover from "@mui/material/Popover";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { cn } from "./cn";

type SelectContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  value: string | undefined;
  setValue: (value: string, label: ReactNode) => void;
  label: ReactNode;
};

const SelectContext = createContext<SelectContextValue | null>(null);

const useSelect = () => {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error("Select components must be used within Select");
  }
  return ctx;
};

export type SelectProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
} & Omit<ComponentProps<"div">, "children">;

export function Select({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  value: valueProp,
  defaultValue,
  onValueChange,
  children,
  ...props
}: SelectProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(
    defaultValue
  );
  const [selectedLabel, setSelectedLabel] = useState<ReactNode>(null);

  const open = openProp ?? uncontrolledOpen;
  const value = valueProp ?? uncontrolledValue;

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

  const setValue = useCallback(
    (nextValue: string, label: ReactNode) => {
      onValueChange?.(nextValue);
      if (valueProp == null) {
        setUncontrolledValue(nextValue);
        setSelectedLabel(label);
      }
      setOpen(false);
    },
    [onValueChange, setOpen, valueProp]
  );

  const ctx = useMemo<SelectContextValue>(
    () => ({
      open,
      setOpen,
      anchorEl,
      setAnchorEl,
      value,
      setValue,
      label: selectedLabel,
    }),
    [open, setOpen, anchorEl, value, setValue, selectedLabel]
  );

  return (
    <SelectContext.Provider value={ctx}>
      <div data-slot="select" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export type SelectTriggerProps = {
  size?: "sm" | "default";
  children?: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "children" | "type">;

export function SelectTrigger({
  className,
  children,
  onClick,
  size = "default",
  ...props
}: SelectTriggerProps) {
  const { open, setOpen, setAnchorEl } = useSelect();

  return (
    <button
      aria-expanded={open}
      aria-haspopup="listbox"
      className={cn(
        "flex w-fit items-center justify-between gap-2 rounded-md border border-border bg-transparent px-3 text-sm shadow-xs",
        size === "default" && "h-9",
        size === "sm" && "h-8",
        className
      )}
      data-size={size}
      data-slot="select-trigger"
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) {
          return;
        }
        setAnchorEl(e.currentTarget);
        setOpen(!open);
      }}
      role="combobox"
      type="button"
      {...props}
    >
      {children}
      <span aria-hidden="true" className="opacity-50">
        ▾
      </span>
    </button>
  );
}

export type SelectValueProps = {
  placeholder?: string;
  className?: string;
} & Omit<ComponentProps<"span">, "children">;

export function SelectValue({ placeholder, className, ...props }: SelectValueProps) {
  const { label, value } = useSelect();

  return (
    <span
      className={cn(
        "line-clamp-1 flex items-center gap-2",
        value == null && "text-muted-foreground",
        className
      )}
      data-slot="select-value"
      {...props}
    >
      {value == null ? placeholder : label}
    </span>
  );
}

export type SelectContentProps = Omit<
  ComponentProps<typeof Popover>,
  "open" | "anchorEl" | "children"
> & {
  className?: string;
  children?: ReactNode;
};

export function SelectContent({ className, children, ...props }: SelectContentProps) {
  const { open, anchorEl, setOpen } = useSelect();

  return (
    <Popover
      anchorEl={anchorEl}
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
      <div className="p-1" role="listbox">
        {children}
      </div>
    </Popover>
  );
}

export type SelectItemProps = {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentProps<"div">, "children">;

export function SelectItem({
  value,
  disabled,
  className,
  children,
  onClick,
  ...props
}: SelectItemProps) {
  const { setValue, value: selectedValue } = useSelect();
  const isSelected = selectedValue === value;

  return (
    <div
      aria-disabled={disabled || undefined}
      aria-selected={isSelected}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        !disabled && "hover:bg-accent hover:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      data-slot="select-item"
      onClick={(e) => {
        onClick?.(e);
        if (!disabled) {
          setValue(value, children);
        }
      }}
      role="option"
      {...props}
    >
      {children}
      {isSelected ? <span className="ml-auto">✓</span> : <span className="ml-auto size-4" />}
    </div>
  );
}

export type SelectGroupProps = ComponentProps<"div">;
export function SelectGroup(props: SelectGroupProps) {
  return <div data-slot="select-group" {...props} />;
}

export type SelectSeparatorProps = ComponentProps<"hr">;
export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <hr
      className={cn("bg-border -mx-1 my-1 h-px border-0", className)}
      data-slot="select-separator"
      role="separator"
      {...props}
    />
  );
}

