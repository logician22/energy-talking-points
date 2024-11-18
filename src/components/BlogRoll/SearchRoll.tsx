import React from "react";
import Fuse from "fuse.js";

// TODO: Come up w a better fallback excerpt than post.excerpt
// A good version would turn headers into bold and maintain formatting,

import { convertToPlainText } from "../../utils";
import { ArticleCard } from "./ArticleCard";
import { PostEdge } from "./types";

export const SearchRoll = (props: { edges: PostEdge[]; search: string }) => {
  const { edges, search } = props;

  const nodes = edges.map((p) => ({
    ...p.node,
    body: convertToPlainText(
      p.node.rawMarkdownBody.split(/### ?References/)[0]
    ),
  }));

  const fuse = new Fuse(nodes, {
    keys: ["body", "frontmatter.title"],
    ignoreLocation: true,
    threshold: 0,
  });

  const results = fuse.search(search);

  return (
    <div
      className="columns is-multiline is-desktop"
      // Make list a single column, for full-width hits
      style={{ flexDirection: "column" }}
    >
      {results.map(({ item: post }) => {
        return (
          <ArticleCard
            post={post}
            search={search}
            key={post.frontmatter.title}
          />
        );
      })}
    </div>
  );
};
