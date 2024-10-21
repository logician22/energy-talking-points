import { marked, Renderer } from "marked";

export const removeTrailingSlash = (slug) =>
  slug[slug.length - 1] === "/" ? slug.slice(0, slug.length - 1) : slug;

export const fullTitle = (title, displayTitle) =>
  displayTitle || `Talking Points on ${title}`;

export const orderPostEdges = (edges, startWithOverview = true) => {
  const overview = edges.find((e) => e.node.frontmatter.title === "Overview");
  const others = edges.filter((e) => e.node.frontmatter.title !== "Overview");

  return startWithOverview ? [overview, ...others] : [...others, overview];
};

export const convertToPlainText = (markdownText: string, options = {}) => {
  const plainTextRenderer = {
    link({ tokens }): string {
      const text = this.parser.parseInline(tokens);
      return text;
    },
    image: ({ title, text }): string => "",
    paragraph: ({ text }): string => text,
    heading: ({ text }): string => text,
    blockquote: ({ text }): string => text,
    listitem: ({ text }): string => `\n - ${text}`,
    checkbox: ({ checked }): string => (checked ? "[x]" : "[ ]"),
    code: ({ text }): string => text,
  } as Renderer;

  marked.setOptions(options);
  marked.use({ renderer: plainTextRenderer });

  const plaintext = marked(markdownText) as string;
  return (
    plaintext
      // Without footnotes
      .replace(/\[\^\d+\]/g, "")
      // Fancy quotes
      .replace(/&quot;/g, '"')
      // Apostrophes
      .replace(/&#39;/g, "'")
      // Breaks
      .replace(/<br \/>/g, "")
      // Or markdown image tags
      .replace(/!\[.*\]\(.*\)/g, "")
  );
};
