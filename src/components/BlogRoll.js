import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import Markdown from "react-markdown";
import Fuse from "fuse.js";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import { fullTitle, orderPostEdges, convertToPlainText } from "../utils";

const getMatchIndex = (text, search) =>
  text.toLowerCase().indexOf(search.toLowerCase());

const highlightMatch = (text, search) => {
  const matchIndex = getMatchIndex(text, search);
  const truncate = matchIndex + search.length > 500;
  const maxPoint = truncate ? 500 : matchIndex + search.length;

  if (matchIndex === -1) {
    return null;
  }

  return `...${text.slice(0, matchIndex)}**${text.slice(
    matchIndex,
    matchIndex + search.length
  )}**${text.slice(maxPoint)}${truncate ? "..." : ""}`;
};

const Excerpt = ({ post, search }) => {
  let excerpt = post.frontmatter.description || post.excerpt;
  if (search.length) {
    const lineArray = post.body.split("\n");
    const lineIndex = lineArray.findIndex((line) =>
      line.toLowerCase().includes(search.toLowerCase())
    );
    const line = lineArray[lineIndex];
    const isBullet = line.slice(0, 2) == "- ";
    const text = isBullet ? line.slice(2) : line;
    excerpt = highlightMatch(text, search) || excerpt;
  }
  return <Markdown children={excerpt} />;
};

const BlogRoll = (props) => {
  const { data, search } = props;
  const { edges } = data.allMarkdownRemark;

  const posts = orderPostEdges(edges) || [];
  const nodes = posts.map((p) => ({
    ...p.node,
    body: convertToPlainText(p.node.rawMarkdownBody.split("### References")[0]),
  }));

  const fuse = new Fuse(nodes, {
    keys: ["body", "frontmatter.title"],
    ignoreLocation: true,
    threshold: 0,
  });

  const results = search.length
    ? fuse.search(search).map((r) => r.item)
    : nodes;

  return (
    <div className="columns is-multiline">
      {posts &&
        results.map((post) => (
          <div className="is-parent column is-6" key={post.id}>
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
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {fullTitle(
                        post.frontmatter.title,
                        post.frontmatter.displaytitle
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
                <p>
                  <Excerpt post={post} search={search} />
                  <br />
                  <br />
                </p>
              </div>
              <div>
                <Link
                  className="button"
                  to={post.fields.slug}
                  // style={{ justifySelf: "flex-end", maxWidth: 200 }}
                >
                  Keep Reading →
                </Link>
              </div>
            </article>
          </div>
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

export default (props) => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
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
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 60) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => (
      <BlogRoll data={data} count={count} search={props.search} />
    )}
  />
);
