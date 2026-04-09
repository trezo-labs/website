"use client";

import React from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/popover";
import { Separator } from "@/ui/separator";
import { Icons } from "hugeicons-proxy";
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb";

import { BsClaude, BsOpenai } from "react-icons/bs";
import { SiPerplexity } from "react-icons/si";
import { FaMarkdown } from "react-icons/fa";

/* ---------------- Types ---------------- */

type DocsAIMode = "explain" | "code_examples" | "summary";

/* ---------------- Prompt Builder ---------------- */

function buildDocsPrompt(url: string, mode: DocsAIMode) {
  const baseContext = `I’m looking at this documentation page: ${url}`;

  const sharedInstructions = `
If you can, use the documentation content directly.
If not, rely on your best available knowledge.

Focus on clarity and practical usage.
`;

  const modePrompts: Record<DocsAIMode, string> = {
    explain: `
Explain this documentation clearly from first principles.
Break down key concepts and how they relate.
${sharedInstructions}
`,
    code_examples: `
Extract and show real usage examples.
Prefer code snippets and practical API usage patterns.
${sharedInstructions}
`,
    summary: `
Summarize this documentation into key points:
- What it is
- Key APIs
- When to use it
${sharedInstructions}
`,
  };

  return `${baseContext}

${modePrompts[mode]}`;
}

function buildAIUrl(baseURL: string, prompt: string) {
  return `${baseURL}${encodeURIComponent(prompt)}`;
}

/* ---------------- AI Targets ---------------- */

const aiTargets = [
  { name: "chatgpt", baseURL: "https://chatgpt.com/?q=" },
  { name: "claude", baseURL: "https://claude.ai/new/?q=" },
  { name: "perplexity", baseURL: "https://www.perplexity.ai/?q=" },
];

/* ---------------- Icons ---------------- */

const aiIcons = {
  chatgpt: BsOpenai,
  claude: BsClaude,
  perplexity: SiPerplexity,
};

const modeIcons: Record<DocsAIMode, React.ElementType> = {
  explain: Icons.DocumentAttachmentIcon,
  code_examples: FaMarkdown,
  summary: Icons.SparklesIcon,
};

/* ---------------- Menu Structure ---------------- */

const menuGroups: Array<{ mode: DocsAIMode; label: string }> = [
  { mode: "explain", label: "Explain page" },
  { mode: "code_examples", label: "Code examples" },
  { mode: "summary", label: "Summary" },
];

/* ---------------- Component ---------------- */

export function DocsCopyPage({ page, url }: { page: string; url: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const trigger = (
    <Button
      variant="secondary"
      size="sm"
      className="peer -ml-0.5 size-8 shadow-none md:size-7 md:text-[0.8rem]"
    >
      <Icons.ArrowDown01Icon className="rotate-180 sm:rotate-0" />
    </Button>
  );

  return (
    <Popover>
      <div className="group/buttons relative flex squircle bg-secondary">
        <PopoverAnchor />

        {/* Copy Button */}
        <Button
          variant="secondary"
          size="sm"
          className="h-8 shadow-none md:h-7 md:text-[0.8rem]"
          onClick={() => copyToClipboard(page)}
        >
          {isCopied ? <TbCopyCheckFilled /> : <TbCopy />}
          <span>Copy Page</span>
        </Button>

        {/* Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden sm:flex">
            {trigger}
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="squircle w-56">
            {/* ✅ TOP ACTION: VIEW MARKDOWN */}
            <DropdownMenuItem asChild>
              <a
                href={`${url}.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium"
              >
                <FaMarkdown className="size-4" />
                <span>View Markdown</span>
              </a>
            </DropdownMenuItem>

            {/* AI MODES */}
            {menuGroups.map((group) => {
              const ModeIcon = modeIcons[group.mode];

              return (
                <div key={group.mode}>
                  <DropdownMenuSeparator />

                  <div className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground">
                    <ModeIcon className="size-3.5" />
                    <span>{group.label}</span>
                  </div>

                  <div>
                    {aiTargets.map((ai) => {
                      const AiIcon = aiIcons[ai.name as keyof typeof aiIcons];

                      const prompt = buildDocsPrompt(url, group.mode);

                      return (
                        <DropdownMenuItem
                          asChild
                          key={`${group.mode}-${ai.name}`}
                        >
                          <a
                            href={buildAIUrl(ai.baseURL, prompt)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <AiIcon className="size-4" />
                            <span className="capitalize">{ai.name}</span>
                          </a>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Separator */}
        <Separator
          orientation="vertical"
          className="absolute top-1 right-8 z-0 h-6! bg-foreground/5! peer-focus-visible:opacity-0 sm:right-7 sm:h-5!"
        />

        {/* Mobile Popover */}
        <PopoverTrigger asChild className="flex sm:hidden">
          {trigger}
        </PopoverTrigger>

        <PopoverContent
          className="w-56 origin-center! squircle bg-background/70 p-1 shadow-none backdrop-blur-sm dark:bg-background/60"
          align="start"
        >
          {/* TOP: VIEW MARKDOWN */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="w-full justify-start gap-2 font-medium"
          >
            <a href={`${url}.md`} target="_blank" rel="noopener noreferrer">
              <FaMarkdown className="size-4" />
              <span>View Markdown</span>
            </a>
          </Button>

          <div className="my-1 h-px bg-border" />

          {/* AI MODES */}
          {menuGroups.map((group) => {
            const ModeIcon = modeIcons[group.mode];

            return (
              <div key={group.mode} className="mb-2">
                <div className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground">
                  <ModeIcon className="size-3.5" />
                  <span>{group.label}</span>
                </div>

                <div>
                  {aiTargets.map((ai) => {
                    const AiIcon = aiIcons[ai.name as keyof typeof aiIcons];

                    const prompt = buildDocsPrompt(url, group.mode);

                    return (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        key={`${group.mode}-${ai.name}`}
                        className="w-full justify-start gap-2 font-normal"
                      >
                        <a
                          href={buildAIUrl(ai.baseURL, prompt)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiIcon className="size-4" />
                          <span className="capitalize">{ai.name}</span>
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </PopoverContent>
      </div>
    </Popover>
  );
}
