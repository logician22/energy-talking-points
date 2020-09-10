import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Content, { HTMLContent } from "../components/Content";
import { fullTitle } from "../utils";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  displayTitle,
  helmet,
  image,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <div className="document">
      <PreviewCompatibleImage
        imageInfo={{
          image,
          alt: `featured image thumbnail for post ${title}`,
        }}
        imageStyle={{ maxHeight: 400, borderRadius: 0 }}
      />
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
                <p className="is-size-5">{description}</p>
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
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
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
            fluid(maxWidth: 120, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
