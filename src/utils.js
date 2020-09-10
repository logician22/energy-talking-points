export const removeTrailingSlash = (slug) =>
  slug[slug.length - 1] === "/" ? slug.slice(0, slug.length - 1) : slug;

export const fullTitle = (title, displayTitle) =>
  displayTitle || `${new Date().getFullYear()} Talking Points on ${title}`;
