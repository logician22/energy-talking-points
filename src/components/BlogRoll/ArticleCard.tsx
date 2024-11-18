import { fullTitle } from "../../utils";
import { SEARCH_THRESHOLD } from "./constants";
import { Post, PostEdge } from "./types";
import React, { ReactNode } from "react";
import { Link } from "gatsby";
import Markdown from "react-markdown";

const TitleHighlight = ({ children }: { children: ReactNode }) => (
  <strong className="has-text-primary">{children}</strong>
);

const highlightMarkdown = (
  markdown: string,
  HighlightComponent = TitleHighlight
) => {
  return (
    <>
      {markdown
        .split("**")
        .map((string, index) =>
          index % 2 === 0 ? (
            <>{string}</>
          ) : (
            <HighlightComponent>{string}</HighlightComponent>
          )
        )}
    </>
  );
};

const getMatchIndex = (text: string, search: string) =>
  text.toLowerCase().indexOf(search.toLowerCase());

const highlightMatch = (text: string, search: string) => {
  const matchIndex = getMatchIndex(text, search);
  const truncate = matchIndex + search.length > 500;
  const maxPoint = truncate ? 500 : matchIndex + search.length;

  if (matchIndex === -1) {
    return "";
  }

  return `${text.slice(0, matchIndex)}**${text.slice(
    matchIndex,
    matchIndex + search.length
  )}**${text.slice(maxPoint)}${truncate ? "..." : ""}`;
};

const defaultExcerpt = (post: Post) =>
  post.frontmatter.description && post.frontmatter.description.length > 2
    ? post.frontmatter.description
    : post.excerpt;

const SearchExcerpt = ({
  post,
  search,
}: {
  post: Post & { body?: string };
  search: string;
}) => {
  // List of React nodes representing highlighted lines (w hits)
  const lines: ReactNode[] = [];

  if (search.length > SEARCH_THRESHOLD && post.body) {
    const lineArray = post.body.split("\n").filter(Boolean);
    lineArray.forEach((line: string) => {
      if (line.toLowerCase().includes(search.toLowerCase())) {
        const isBullet = line.slice(0, 2) === "- ";
        const text = isBullet ? line.slice(2) : line;
        lines.push(highlightMatch(text, search as string));
      }
    });
  }

  const limit = 3;
  const limitedLines = lines.length > limit;

  return lines.length ? (
    <>
      <Markdown>
        {lines
          .slice(0, limit)
          .join("\n\n...\n\n")
          .concat(limitedLines ? "\n\n..." : "")}
      </Markdown>
    </>
  ) : (
    <>
      <p style={{ fontStyle: "italic", fontWeight: "bold" }}>
        No matching text. Article description:
      </p>
      <Markdown>{defaultExcerpt(post)}</Markdown>
    </>
  );
};

const articleTitle = (title: string, displayTitle: string, search: string) => {
  const text = fullTitle(title, displayTitle);
  if (
    search.length <= SEARCH_THRESHOLD ||
    !text.toLowerCase().includes(search.toLowerCase())
  ) {
    return text;
  }

  const highlighted = highlightMatch(text, search);
  return highlightMarkdown(highlighted);
};

export const ArticleCard = ({
  post,
  search,
}: {
  post: Post & { body?: string };
  search: string;
}) => {
  const isSearch = search.length > SEARCH_THRESHOLD;
  return (
    <div key={post.frontmatter.title}>
      <article
        className={`blog-list-item tile is-child box notification`}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <header style={{ marginBottom: 30 }}>
            {post.frontmatter.featuredimage ? (
              <Link
                to={post.fields.slug}
                className={`featured-thumbnail ${isSearch ? "in-search" : ""}`}
              >
                <img
                  src={post.frontmatter.featuredimage}
                  alt={`featured image thumbnail for post ${post.frontmatter.title}`}
                  style={{ maxWidth: isSearch ? "200px" : "100%" }}
                />
              </Link>
            ) : null}
            <p className="post-meta">
              <Link
                className="title has-text-primary is-size-4"
                to={post.fields.slug}
              >
                {articleTitle(
                  post.frontmatter.title,
                  post.frontmatter.displaytitle,
                  search
                )}
              </Link>
              <br />
              <span
                className="subtitle is-size-5 is-block"
                style={{ marginTop: 5 }}
              >
                by Alex Epstein
              </span>
            </p>
          </header>
          <div style={{ marginBottom: "1em", display: "block" }}>
            <Link to={post.fields.slug} style={{ textDecoration: "none" }}>
              {isSearch ? (
                <SearchExcerpt search={search} post={post} />
              ) : (
                <Markdown children={defaultExcerpt(post)} />
              )}
            </Link>
            <br />
            <br />
          </div>
        </div>
        <div>
          <Link className="button" to={post.fields.slug}>
            Keep Reading →
          </Link>
        </div>
      </article>
    </div>
  );
};
