import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Content, { HTMLContent } from "../components/Content";
import SignUpBar from "../components/SignUpBar";
import { fullTitle } from "../utils";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  displayTitle,
  helmet,
  image,
  next,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <div className="document">
      {/* <PreviewCompatibleImage
        imageInfo={{
          image,
          alt: `featured image thumbnail for post ${title}`,
        }}
        imageStyle={{ maxHeight: 400, borderRadius: 0 }}
      /> */}
      <div className="has-background-light">
        <section className="section">
          <div className="container content">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                  {fullTitle(title, displayTitle)}
                </h1>
                <h2 className="title is-size-4 has-text-weight-bold is-bold-light">
                  By Alex Epstein
                </h2>
                {description.split("\n").map((p) => (
                  <p className="is-size-5" key={p.slice(0, 2)}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="section">
        {helmet || ""}
        <div className="container content">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <PostContent content={content} />
            </div>
          </div>
        </div>
      </section>

      <div className="next-button">
        <section className="section">
          <div className="container content">
            <div className="column is-10 is-offset-1">
              <Link to={next.fields.slug}>
                <h3 className="is-size-3">
                  Next up: {next.frontmatter.title}{" "}
                  <span className="arrow">→</span>
                </h3>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <SignUpBar />
    </div>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post, allMarkdownRemark } = data;
  const currentIndex = allMarkdownRemark.edges.findIndex((edge) => {
    return edge.node.frontmatter.title === post.frontmatter.title;
  });
  const nextIndex =
    currentIndex === allMarkdownRemark.edges.length - 1 ? 0 : currentIndex + 1;
  const next = allMarkdownRemark.edges[nextIndex].node;
  return (
    <Layout>
      <BlogPostTemplate
        next={next}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="Energy Talking Points | %s">
            <title>{post.frontmatter.title}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        displayTitle={post.frontmatter.displaytitle}
        image={post.frontmatter.featuredimage}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        displaytitle
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
