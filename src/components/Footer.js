import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import { orderPostEdges } from "../utils";

const Footer = class extends React.Component {
  render() {
    const { data } = this.props;
    let edges = orderPostEdges(data.allMarkdownRemark.edges);
    edges = [...edges];

    const padStartLinks = [
      {
        to: "https://industrialprogress.com",
        text: "Center for Industrial Progress",
        external: true,
      },
      { to: "/", text: "Home" },
    ];
    const padEndLinks = [
      { to: "/admin/", text: "Admin", external: true },
      { to: "/sign-up/", text: "Contact" },
    ];
    const postGroups = [];
    const itemsPerCol = Math.floor(
      (edges.length + padStartLinks.length + padEndLinks.length) / 3
    );
    const addNode = (postGroups, node) => {
      if (!postGroups[0]) {
        postGroups.push([node]);
      } else if (postGroups[postGroups.length - 1].length < itemsPerCol) {
        postGroups[postGroups.length - 1].push(node);
      } else {
        postGroups.push([node]);
      }
    };

    padStartLinks.forEach((link) => addNode(postGroups, link));

    edges.forEach((edge) => {
      const slug = edge.node.fields.slug;
      const node = {
        to: slug,
        text: edge.node.frontmatter.title,
      };
      addNode(postGroups, node);
    });

    padEndLinks.forEach((link) => addNode(postGroups, link));

    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
            <div style={{ maxWidth: "100vw" }} className="columns">
              {postGroups.map((group, ind) => (
                <div className="column is-4" key={ind}>
                  <section className="menu">
                    <ul className="menu-list">
                      {group.map((node) => (
                        <li key={node.to}>
                          {node.external ? (
                            <a
                              className="navbar-item"
                              href={node.to}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {node.text}
                            </a>
                          ) : (
                            <Link className="navbar-item" to={node.to}>
                              {node.text}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
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
      }
    `}
    render={(data, count) => <Footer data={data} count={count} />}
  />
);
