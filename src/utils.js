import marked from "marked";
import PlainTextRenderer from "marked-plaintext";

export const removeTrailingSlash = (slug) =>
  slug[slug.length - 1] === "/" ? slug.slice(0, slug.length - 1) : slug;

export const fullTitle = (title, displayTitle) =>
  displayTitle || `Talking Points on ${title}`;

export const orderPostEdges = (edges, startWithOverview = true) => {
  const overview = edges.find((e) => e.node.frontmatter.title === "Overview");
  const others = edges.filter((e) => e.node.frontmatter.title !== "Overview");

  return startWithOverview ? [overview, ...others] : [...others, overview];
};

export const convertToPlainText = (
  markdownText,
  retainBullets = true,
  options = {}
) => {
  const renderer = new PlainTextRenderer();
  renderer.checkbox = (text) => {
    return text;
  };
  if (retainBullets) {
    renderer.listitem = (text) => {
      return `\n- ${text}`;
    };
  }
  marked.setOptions(options);
  const plaintext = marked(markdownText, { renderer });
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
  );
};
