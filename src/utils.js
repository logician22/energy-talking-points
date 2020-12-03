export const removeTrailingSlash = (slug) =>
  slug[slug.length - 1] === "/" ? slug.slice(0, slug.length - 1) : slug;

export const fullTitle = (title, displayTitle) =>
  displayTitle || `Talking Points on ${title}`;

export const orderPostEdges = (edges, startWithOverview = true) => {
  const overview = edges.find((e) => e.node.frontmatter.title === "Overview");
  const others = edges.filter((e) => e.node.frontmatter.title !== "Overview");

  return startWithOverview ? [overview, ...others] : [...others, overview];
};
