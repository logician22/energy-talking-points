import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import Markdown from "react-markdown";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import { fullTitle, orderPostEdges } from "../utils";

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;

    const posts = orderPostEdges(edges);

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
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
                    <Markdown
                      children={post.frontmatter.description || post.excerpt}
                    />
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
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                description
                displaytitle
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
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
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
