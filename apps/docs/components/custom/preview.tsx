import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ElementsMuiThemeProvider } from "@repo/elements-mui/theme-provider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/shadcn-ui/components/ui/resizable";
import { cn } from "@repo/shadcn-ui/lib/utils";
import { codeToHtml } from "shiki";
import {
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
} from "@/components/geistdocs/code-block-tabs";
import { CodeBlock } from "../geistdocs/code-block";

type ComponentPreviewProps = {
  path: string;
  className?: string;
};

export const Preview = async ({ path, className }: ComponentPreviewProps) => {
  const shadcnCode = await readFile(
    join(process.cwd(), "..", "..", "packages", "examples", "src", `${path}.tsx`),
    "utf-8"
  );
  const muiCode = await readFile(
    join(
      process.cwd(),
      "..",
      "..",
      "packages",
      "examples-mui",
      "src",
      `${path}.tsx`
    ),
    "utf-8"
  );

  const ShadcnComponent = await import(`@repo/examples/src/${path}.tsx`).then(
    (module) => module.default
  );
  const MuiComponent = await import(`@repo/examples-mui/src/${path}.tsx`).then(
    (module) => module.default
  );

  const parsedShadcnCode = shadcnCode
    .replace(/@repo\/shadcn-ui\//g, "@/")
    .replace(/@repo\/elements\//g, "@/components/ai-elements/");

  const highlightedShadcnCode = await codeToHtml(parsedShadcnCode, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
  const highlightedMuiCode = await codeToHtml(muiCode, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <CodeBlockTabs defaultValue="preview-shadcn">
      <CodeBlockTabsList>
        <CodeBlockTabsTrigger value="preview-shadcn">
          Preview (shadcn-ui)
        </CodeBlockTabsTrigger>
        <CodeBlockTabsTrigger value="preview-mui">
          Preview (material UI)
        </CodeBlockTabsTrigger>
        <CodeBlockTabsTrigger value="code">Code</CodeBlockTabsTrigger>
      </CodeBlockTabsList>
      <CodeBlockTab className="not-prose p-0" value="preview-shadcn">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={100}>
            <div className={cn("h-[600px] overflow-auto p-4", className)}>
              <ShadcnComponent />
            </div>
          </ResizablePanel>
          <ResizableHandle
            className="translate-x-px border-none [&>div]:shrink-0"
            withHandle
          />
          <ResizablePanel defaultSize={0} />
        </ResizablePanelGroup>
      </CodeBlockTab>
      <CodeBlockTab className="not-prose p-0" value="preview-mui">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={100}>
            <div className={cn("h-[600px] overflow-auto p-4", className)}>
              <ElementsMuiThemeProvider>
                <MuiComponent />
              </ElementsMuiThemeProvider>
            </div>
          </ResizablePanel>
          <ResizableHandle
            className="translate-x-px border-none [&>div]:shrink-0"
            withHandle
          />
          <ResizablePanel defaultSize={0} />
        </ResizablePanelGroup>
      </CodeBlockTab>
      <CodeBlockTab className="p-0" value="code">
        <div className="not-prose h-[600px] overflow-y-auto">
          <CodeBlock className="pt-0">
            <div className="border-b px-4 py-2 font-medium text-sm">
              Shadcn-ui example
            </div>
            {/** biome-ignore lint/security/noDangerouslySetInnerHtml: "this is needed." */}
            <pre dangerouslySetInnerHTML={{ __html: highlightedShadcnCode }} />
            <div className="border-b px-4 py-2 font-medium text-sm">
              Material UI example
            </div>
            {/** biome-ignore lint/security/noDangerouslySetInnerHtml: "this is needed." */}
            <pre dangerouslySetInnerHTML={{ __html: highlightedMuiCode }} />
          </CodeBlock>
        </div>
      </CodeBlockTab>
    </CodeBlockTabs>
  );
};
