import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery, useStaticQuery } from "gatsby";
import Markdown from "react-markdown";
import Fuse from "fuse.js";
import { fullTitle, orderPostEdges, convertToPlainText } from "../utils";

// Don't show search results below this char count
const SEARCH_THRESHOLD = 2;

// TODO: Come up w a better fallback excerpt than post.excerpt
// A good version would turn headers into bold and maintain formatting,
// truncating to a set length of characters.
const defaultExcerpt = (post) =>
  post.frontmatter.description && post.frontmatter.description.length > 2
    ? post.frontmatter.description
    : post.excerpt;

const getMatchIndex = (text, search) =>
  text.toLowerCase().indexOf(search.toLowerCase());

const highlightMatch = (text, search) => {
  const matchIndex = getMatchIndex(text, search);
  const truncate = matchIndex + search.length > 500;
  const maxPoint = truncate ? 500 : matchIndex + search.length;

  if (matchIndex === -1) {
    return null;
  }

  return `${text.slice(0, matchIndex)}**${text.slice(
    matchIndex,
    matchIndex + search.length
  )}**${text.slice(maxPoint)}${truncate ? "..." : ""}`;
};

const TitleHighlight = ({ children }) => (
  <em className="has-text-primary">{children}</em>
);

const highlightMarkdown = (markdown, HighlightComponent = TitleHighlight) => {
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

const articleTitle = (title, displayTitle, search) => {
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

const SearchExcerpt = ({ post, search }) => {
  // List of React nodes representing highlighted lines (w hits)
  const lines = [];

  if (search.length > SEARCH_THRESHOLD) {
    const lineArray = post.body.split("\n");
    lineArray.forEach((line) => {
      if (line.toLowerCase().includes(search.toLowerCase())) {
        const isBullet = line.slice(0, 2) === "- ";
        const text = isBullet ? line.slice(2) : line;
        lines.push(
          highlightMarkdown(highlightMatch(text, search), (props) => (
            <em key={props.children}>
              <strong>{props.children}</strong>
            </em>
          ))
        );
      }
    });
  }

  return lines.length ? (
    <>
      {lines.map((line, index) => {
        return (
          <span key={index}>
            {line}
            {index === lines.length - 1 ? null : (
              <span
                style={{
                  marginBottom: "1em",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                ...
              </span>
            )}
          </span>
        );
      })}
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

const ArticleCard = ({ post, search }) => {
  const isSearch = search.length > SEARCH_THRESHOLD;
  return (
    <div
      className={`is-parent column is-${isSearch ? "12" : "6"}`}
      key={post.frontmatter.title}
    >
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

const SearchRoll = (props) => {
  const { edges, search } = props;

  const nodes = edges.map((p) => ({
    ...p.node,
    body: convertToPlainText(p.node.rawMarkdownBody.split("### References")[0]),
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

const BlogRoll = (props) => {
  const { data, search } = props;
  const { edges } = data.allMarkdownRemark;

  const isSearch = search.length > SEARCH_THRESHOLD;
  if (isSearch) {
    // Displays cards as flat list (not grid)
    // With all hits within an article separately listed and highlighted.
    return <SearchRoll edges={edges} search={search} />;
  }

  const posts = orderPostEdges(edges) || [];

  return (
    <div className={`columns is-multiline`}>
      {posts.map(({ node: post }) => (
        <ArticleCard post={post} search={search} key={post.frontmatter.title} />
      ))}
    </div>
  );
};

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default (props) => {
  const data = useStaticQuery(graphql`
    query BlogRollQuery {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            rawMarkdownBody
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              description
              displaytitle
              featuredimage
            }
          }
        }
      }
    }
  `);

  return <BlogRoll data={data} search={props.search} />;
};
