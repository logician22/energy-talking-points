import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import { orderPostEdges } from "../../utils";
import { SEARCH_THRESHOLD } from "./constants";
import { Post, PostEdge } from "./types";
import { SearchRoll } from "./SearchRoll";
import { ArticleCard } from "./ArticleCard";

const BlogRoll = (props: {
  data: { allMarkdownRemark: { edges: PostEdge[] } };
  search: string;
}) => {
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
        <ArticleCard
          post={post as Post & { body?: string }}
          search={search}
          key={post.frontmatter.title}
        />
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

export default (props: { search: string }) => {
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
