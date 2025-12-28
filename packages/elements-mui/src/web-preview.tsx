"use client";

import MuiTooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { ChevronDownIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "./ui/cn";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Input } from "./ui/input";

export type WebPreviewContextValue = {
  url: string;
  setUrl: (url: string) => void;
  consoleOpen: boolean;
  setConsoleOpen: (open: boolean) => void;
};

const WebPreviewContext = createContext<WebPreviewContextValue | null>(null);

const useWebPreview = () => {
  const context = useContext(WebPreviewContext);
  if (!context) {
    throw new Error("WebPreview components must be used within a WebPreview");
  }
  return context;
};

export type WebPreviewProps = ComponentProps<"div"> & {
  defaultUrl?: string;
  onUrlChange?: (url: string) => void;
};

export const WebPreview = ({
  className,
  children,
  defaultUrl = "",
  onUrlChange,
  style,
  ...props
}: WebPreviewProps) => {
  const [url, setUrl] = useState(defaultUrl);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const theme = useTheme();

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    onUrlChange?.(newUrl);
  };

  const contextValue: WebPreviewContextValue = {
    url,
    setUrl: handleUrlChange,
    consoleOpen,
    setConsoleOpen,
  };

  return (
    <WebPreviewContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex size-full flex-col rounded-lg border",
          className
        )}
        style={{ backgroundColor: theme.palette.background.paper, borderColor: theme.palette.divider, ...style }}
        {...props}
      >
        {children}
      </div>
    </WebPreviewContext.Provider>
  );
};

export type WebPreviewNavigationProps = ComponentProps<"div">;

export const WebPreviewNavigation = ({
  className,
  children,
  ...props
}: WebPreviewNavigationProps) => (
  <div
    className={cn("flex items-center gap-1 border-b p-2", className)}
    {...props}
  >
    {children}
  </div>
);

export type WebPreviewNavigationButtonProps = ComponentProps<typeof Button> & {
  tooltip?: string;
};

export const WebPreviewNavigationButton = ({
  onClick,
  disabled,
  tooltip,
  children,
  ...props
}: WebPreviewNavigationButtonProps) => (
  <MuiTooltip title={tooltip ?? ""}>
    <span>
      <Button
        className="h-8 w-8 min-w-0 p-0"
        disabled={disabled}
        onClick={onClick}
        size="icon-sm"
        sx={{
          color: "text.secondary",
          "&:hover": { bgcolor: "action.hover", color: "text.primary" },
        }}
        type="button"
        variant="ghost"
        {...props}
      >
        {children}
      </Button>
    </span>
  </MuiTooltip>
);

export type WebPreviewUrlProps = ComponentProps<typeof Input>;

export const WebPreviewUrl = ({
  value,
  onChange,
  onKeyDown,
  ...props
}: WebPreviewUrlProps) => {
  const { url, setUrl } = useWebPreview();
  const [inputValue, setInputValue] = useState(url);

  // Sync input value with context URL when it changes externally
  useEffect(() => {
    setInputValue(url);
  }, [url]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const target = event.target as HTMLInputElement;
      setUrl(target.value);
    }
    onKeyDown?.(event);
  };

  return (
    <Input
      className="h-8 flex-1 text-sm"
      onChange={onChange ?? handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Enter URL..."
      value={value ?? inputValue}
      {...props}
    />
  );
};

export type WebPreviewBodyProps = ComponentProps<"iframe"> & {
  loading?: ReactNode;
};

export const WebPreviewBody = ({
  className,
  loading,
  src,
  ...props
}: WebPreviewBodyProps) => {
  const { url } = useWebPreview();

  return (
    <div className="flex-1">
      <iframe
        className={cn("size-full", className)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        src={(src ?? url) || undefined}
        title="Preview"
        {...props}
      />
      {loading}
    </div>
  );
};

export type WebPreviewConsoleProps = ComponentProps<"div"> & {
  logs?: Array<{
    level: "log" | "warn" | "error";
    message: string;
    timestamp: Date;
  }>;
};

export const WebPreviewConsole = ({
  className,
  style,
  logs = [],
  children,
  ...props
}: WebPreviewConsoleProps) => {
  const { consoleOpen, setConsoleOpen } = useWebPreview();
  const theme = useTheme();

  return (
    <Collapsible
      className={cn("border-t font-mono text-sm", className)}
      onOpenChange={setConsoleOpen}
      open={consoleOpen}
      style={{ backgroundColor: theme.palette.action.hover, ...style }}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <Button
          className="flex w-full items-center justify-between p-4 text-left font-medium"
          sx={{ "&:hover": { bgcolor: "action.hover" } }}
          variant="ghost"
        >
          Console
          <ChevronDownIcon
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              consoleOpen && "rotate-180"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          "px-4 pb-4",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in"
        )}
      >
        <div className="max-h-48 space-y-1 overflow-y-auto">
          {logs.length === 0 ? (
            <Typography color="text.secondary" component="p" variant="body2">
              No console output
            </Typography>
          ) : (
            logs.map((log, index) => (
              <div
                className="text-xs"
                key={`${log.timestamp.getTime()}-${index}`}
                style={{
                  color:
                    log.level === "error"
                      ? theme.palette.error.main
                      : log.level === "warn"
                        ? theme.palette.warning.main
                        : theme.palette.text.primary,
                }}
              >
                <Typography
                  color="text.secondary"
                  component="span"
                  sx={{ fontSize: 12 }}
                  variant="caption"
                >
                  {log.timestamp.toLocaleTimeString()}
                </Typography>{" "}
                {log.message}
              </div>
            ))
          )}
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
