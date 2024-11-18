import { marked, Renderer } from "marked";
import { PostEdge } from "./components/BlogRoll/types";

export const removeTrailingSlash = (slug: string) =>
  slug[slug.length - 1] === "/" ? slug.slice(0, slug.length - 1) : slug;

export const fullTitle = (title: string, displayTitle: string) =>
  displayTitle || `Talking Points on ${title}`;

export const orderPostEdges = (
  edges: PostEdge[],
  startWithOverview = true
): PostEdge[] => {
  const overview = edges.find((e) => e.node.frontmatter.title === "Overview");
  const others = edges.filter((e) => e.node.frontmatter.title !== "Overview");

  return (
    startWithOverview ? [overview, ...others] : [...others, overview]
  ).filter(Boolean) as PostEdge[];
};

export const convertToPlainText = (markdownText: string, options = {}) => {
  const plainTextRenderer = {
    link({ tokens }): string {
      const text = this.parser.parseInline(tokens);
      if (markdownText.includes("published on November 23, 2022")) debugger;
      return text;
    },
    image: ({ title, text }): string => "",
    paragraph: ({ text }): string => `\n${text}`,
    text: ({ text }): string => `\n${text}`,
    heading: ({ text }): string => `\n${text}`,
    blockquote: ({ text }): string => `\n${text}`,
    listitem: ({ text }): string => `\n - ${text}`,
    checkbox: ({ checked }): string => (checked ? "\n[x]" : "\n[ ]"),
    em: ({ text }): string => text,
    strong: ({ text }): string => text,
    code: ({ text }): string => `\n${text}`,
  } as Renderer;
  // marked.setOptions(options);
  marked.use({ renderer: plainTextRenderer });

  const plaintext = marked(markdownText) as string;

  const strippedPlaintext = plaintext
    // Without footnotes
    .replace(/\[\^\d+\]/g, "")
    // Fancy quotes
    .replace(/&quot;/g, '"')
    // Apostrophes
    .replace(/&#39;/g, "'")
    // Breaks
    .replace(/<br ?\/>/g, "")
    // Remove remaining HTML tag delimiters
    .replace(/<.*>/g, "")
    // Or markdown image tags
    .replace(/!\[.*\]\(.*\)/g, "")
    // Replace lingering links with their content
    .replace(/\[(.+)\]\(.+\)/g, "$1")
    // Hide line-trailing \ symbols
    .replace(/\\\n/g, "\n")
    // Hide em and strong wrappers
    .replace(/\_/g, "")
    .replace(/\*/g, "");

  return strippedPlaintext;
};
