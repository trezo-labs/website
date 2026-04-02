"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { BsClaude, BsOpenai } from "react-icons/bs";
import { FaMarkdown } from "react-icons/fa";
import { SiPerplexity } from "react-icons/si";
import { RiGeminiLine } from "react-icons/ri";
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

/* ---------------- Prompt URL ---------------- */

function getPromptUrl(baseURL: string, url: string) {
  return `${baseURL}?q=${encodeURIComponent(
    `I’m looking at this documentation page:
${url}

Use this page as the source of truth.

Help me understand how to use it. Be ready to:
- explain concepts clearly
- provide examples
- help debug issues
- show real usage patterns when needed
`,
  )}`;
}

const menuItems = {
  markdown: (url: string) => (
    <a href={`${url}.md`} target="_blank" rel="noopener noreferrer">
      <FaMarkdown className="size-4" />
      <span>View as Markdown</span>
    </a>
  ),
  chatgpt: (url: string) => (
    <a
      href={getPromptUrl("https://chatgpt.com", url)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <BsOpenai className="size-4" />
      <span>Open in ChatGPT</span>
    </a>
  ),
  claude: (url: string) => (
    <a
      href={getPromptUrl("https://claude.ai/new", url)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <BsClaude className="size-4" />
      <span>Open in Claude</span>
    </a>
  ),
  perplexity: (url: string) => (
    <a
      href={getPromptUrl("https://www.perplexity.ai", url)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SiPerplexity className="size-4" />
      <span>Open in Perplexity</span>
    </a>
  ),
};

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
      <div className="group/buttons relative flex corner-shape bg-secondary *:data-[slot=button]:focus-visible:relative *:data-[slot=button]:focus-visible:z-10">
        <PopoverAnchor />
        <Button
          variant="secondary"
          size="sm"
          className="h-8 shadow-none md:h-7 md:text-[0.8rem]"
          onClick={() => copyToClipboard(page)}
        >
          {isCopied ? <TbCopyCheckFilled /> : <TbCopy />}
          <span>Copy Page</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden sm:flex">
            {trigger}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="corner-shape w-48">
            {Object.entries(menuItems).map(([key, value]) => (
              <DropdownMenuItem key={key} asChild>
                {value(url)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator
          orientation="vertical"
          className="absolute top-1 right-8 z-0 h-6! bg-foreground/5! peer-focus-visible:opacity-0 sm:right-7 sm:h-5!"
        />
        <PopoverTrigger asChild className="flex sm:hidden">
          {trigger}
        </PopoverTrigger>
        <PopoverContent
          className="w-48 origin-center! corner-shape bg-background/70 p-1 shadow-none backdrop-blur-sm dark:bg-background/60"
          align="start"
        >
          {Object.entries(menuItems).map(([key, value]) => (
            <Button
              variant="ghost"
              size="lg"
              asChild
              key={key}
              className="w-full justify-start text-base font-normal *:[svg]:text-muted-foreground"
            >
              {value(url)}
            </Button>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  );
}
