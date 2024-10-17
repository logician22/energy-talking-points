import _ from "lodash";
import path from "path";
import { createFilePath } from "gatsby-source-filesystem";
import { type GatsbyNode } from "gatsby";
import { GraphQLError } from "graphql";

export const createPages: GatsbyNode["createPages"] = ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;

  return graphql<{
    allMarkdownRemark: {
      edges: Array<{
        node: {
          id: string;
          fields: {
            slug: string;
          };
          frontmatter: {
            templateKey: string;
          };
        };
      }>;
    };
  }>(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e: GraphQLError) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data!.allMarkdownRemark.edges;

    posts.forEach((edge) => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(
            edge.node.frontmatter.templateKey || "blog-post"
          )}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      });
    });
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions; // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, basePath: "documents/" });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
