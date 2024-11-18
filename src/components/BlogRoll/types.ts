export type Post = {
  excerpt?: string;
  rawMarkdownBody: string;
  frontmatter: {
    title: string;
    description: string;
    displaytitle: string;
    featuredimage: string;
  };
  fields: {
    slug: string;
  };
};

export type PostEdge = {
  node: Post;
};
