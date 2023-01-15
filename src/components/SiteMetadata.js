import { graphql, useStaticQuery } from "gatsby";

const useSiteMetadata = () => {
  const { site, allImageSharp } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
        allImageSharp {
          edges {
            node {
              fixed(quality: 75) {
                originalName
                src
              }
            }
          }
        }
      }
    `
  );
  const defaultImageEdge = allImageSharp.edges.filter(
    (e) => e.node.fixed.originalName === "energy.jpg"
  )[0];
  const defaultImage = defaultImageEdge
    ? defaultImageEdge.node.fixed.src
    : "/img/energy.jpg";

  return { site, defaultImage };
};

export default useSiteMetadata;
