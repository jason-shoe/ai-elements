import MuiDialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import { cn } from "./ui/cn";

type ModelSelectorContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ModelSelectorContext = createContext<ModelSelectorContextValue | null>(
  null
);

const useModelSelector = () => {
  const ctx = useContext(ModelSelectorContext);
  if (!ctx) {
    throw new Error("ModelSelector components must be used within ModelSelector");
  }
  return ctx;
};

export type ModelSelectorProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
} & Omit<ComponentProps<"div">, "children">;

export const ModelSelector = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: ModelSelectorProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
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

  const value = useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return (
    <ModelSelectorContext.Provider value={value}>
      <div data-slot="model-selector" {...props}>
        {children}
      </div>
    </ModelSelectorContext.Provider>
  );
};

export type ModelSelectorTriggerProps = {
  asChild?: boolean;
  children?: ReactNode;
} & Omit<ComponentProps<"button">, "children" | "type">;

export const ModelSelectorTrigger = ({
  asChild = false,
  children,
  onClick,
  className,
  ...props
}: ModelSelectorTriggerProps) => {
  const { open, setOpen } = useModelSelector();

  const handleClick: ComponentProps<"button">["onClick"] = (e) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      setOpen(!open);
    }
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<any>;
    return cloneElement(child, {
      ...props,
      onClick: handleClick,
      className: cn(child.props?.className, className),
    });
  }

  return (
    <button
      className={cn(className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export type ModelSelectorContentProps = Omit<
  ComponentProps<typeof MuiDialogContent>,
  "children"
> & {
  title?: ReactNode;
  children?: ReactNode;
};

export const ModelSelectorContent = ({
  className,
  children,
  title = "Model Selector",
  ...props
}: ModelSelectorContentProps) => (
  <ModelSelectorDialog open={useModelSelector().open} onOpenChange={useModelSelector().setOpen}>
    <MuiDialogContent className={cn("p-0", className)} {...props}>
      <MuiDialogTitle className="sr-only">{title}</MuiDialogTitle>
      <Command className="**:data-[slot=command-input-wrapper]:h-auto">
        {children}
      </Command>
    </MuiDialogContent>
  </ModelSelectorDialog>
);

export type ModelSelectorDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
} & Omit<ComponentProps<typeof MuiDialog>, "open" | "onClose" | "children">;

export const ModelSelectorDialog = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: ModelSelectorDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
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

  return (
    <MuiDialog
      onClose={() => setOpen(false)}
      open={open}
      {...props}
    >
      {children}
    </MuiDialog>
  );
};

export type ModelSelectorInputProps = ComponentProps<typeof CommandInput>;

export const ModelSelectorInput = ({
  className,
  ...props
}: ModelSelectorInputProps) => (
  <CommandInput className={cn("h-auto py-3.5", className)} {...props} />
);

export type ModelSelectorListProps = ComponentProps<typeof CommandList>;

export const ModelSelectorList = (props: ModelSelectorListProps) => (
  <CommandList {...props} />
);

export type ModelSelectorEmptyProps = ComponentProps<typeof CommandEmpty>;

export const ModelSelectorEmpty = (props: ModelSelectorEmptyProps) => (
  <CommandEmpty {...props} />
);

export type ModelSelectorGroupProps = ComponentProps<typeof CommandGroup>;

export const ModelSelectorGroup = (props: ModelSelectorGroupProps) => (
  <CommandGroup {...props} />
);

export type ModelSelectorItemProps = ComponentProps<typeof CommandItem>;

export const ModelSelectorItem = (props: ModelSelectorItemProps) => (
  <CommandItem {...props} />
);

export type ModelSelectorShortcutProps = ComponentProps<typeof CommandShortcut>;

export const ModelSelectorShortcut = (props: ModelSelectorShortcutProps) => (
  <CommandShortcut {...props} />
);

export type ModelSelectorSeparatorProps = ComponentProps<
  typeof CommandSeparator
>;

export const ModelSelectorSeparator = (props: ModelSelectorSeparatorProps) => (
  <CommandSeparator {...props} />
);

export type ModelSelectorLogoProps = Omit<
  ComponentProps<"img">,
  "src" | "alt"
> & {
  provider:
    | "moonshotai-cn"
    | "lucidquery"
    | "moonshotai"
    | "zai-coding-plan"
    | "alibaba"
    | "xai"
    | "vultr"
    | "nvidia"
    | "upstage"
    | "groq"
    | "github-copilot"
    | "mistral"
    | "vercel"
    | "nebius"
    | "deepseek"
    | "alibaba-cn"
    | "google-vertex-anthropic"
    | "venice"
    | "chutes"
    | "cortecs"
    | "github-models"
    | "togetherai"
    | "azure"
    | "baseten"
    | "huggingface"
    | "opencode"
    | "fastrouter"
    | "google"
    | "google-vertex"
    | "cloudflare-workers-ai"
    | "inception"
    | "wandb"
    | "openai"
    | "zhipuai-coding-plan"
    | "perplexity"
    | "openrouter"
    | "zenmux"
    | "v0"
    | "iflowcn"
    | "synthetic"
    | "deepinfra"
    | "zhipuai"
    | "submodel"
    | "zai"
    | "inference"
    | "requesty"
    | "morph"
    | "lmstudio"
    | "anthropic"
    | "aihubmix"
    | "fireworks-ai"
    | "modelscope"
    | "llama"
    | "scaleway"
    | "amazon-bedrock"
    | "cerebras"
    | (string & {});
};

export const ModelSelectorLogo = ({
  provider,
  className,
  ...props
}: ModelSelectorLogoProps) => (
  <img
    {...props}
    alt={`${provider} logo`}
    className={cn("size-3 dark:invert", className)}
    height={12}
    src={`https://models.dev/logos/${provider}.svg`}
    width={12}
  />
);

export type ModelSelectorLogoGroupProps = ComponentProps<"div">;

export const ModelSelectorLogoGroup = ({
  className,
  ...props
}: ModelSelectorLogoGroupProps) => (
  <div
    className={cn(
      "-space-x-1 flex shrink-0 items-center [&>img]:rounded-full [&>img]:bg-background [&>img]:p-px [&>img]:ring-1 dark:[&>img]:bg-foreground",
      className
    )}
    {...props}
  />
);

export type ModelSelectorNameProps = ComponentProps<"span">;

export const ModelSelectorName = ({
  className,
  ...props
}: ModelSelectorNameProps) => (
  <span className={cn("flex-1 truncate text-left", className)} {...props} />
);
