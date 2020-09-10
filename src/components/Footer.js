import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";

import { removeTrailingSlash } from "../utils";
import logo from "../img/cip.png";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";

const Footer = class extends React.Component {
  render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;
    const postGroups = [[{ to: "/", text: "Home" }]];

    const addNode = (postGroups, node) => {
      if (postGroups[postGroups.length - 1].length < 5) {
        postGroups[postGroups.length - 1].push(node);
      } else {
        postGroups.push([node]);
      }
    };
    edges.forEach((edge) => {
      const slug = removeTrailingSlash(edge.node.fields.slug);
      const node = {
        to: slug,
        text: edge.node.frontmatter.title,
      };
      addNode(postGroups, node);
    });

    addNode(postGroups, { to: "/admin", text: "Admin", external: true });

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
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
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
      }
    `}
    render={(data, count) => <Footer data={data} count={count} />}
  />
);
