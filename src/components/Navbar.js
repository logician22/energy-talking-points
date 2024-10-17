import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";

import DownChevron from "./DownChevron";
import epstein from "../img/epstein.jpeg";
import { orderPostEdges } from "../utils";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      more: false,
      navBarActiveClass: "",
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            });
      }
    );
  };

  toggleMore = () => {
    // toggle the active boolean in the state
    this.setState({
      more: !this.state.more,
    });
  };

  render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;
    const { more, navBarActiveClass, active } = this.state;

    // Show first 5 non-overview pages in header
    const posts = orderPostEdges(edges, false);

    const displayPosts = active ? posts : posts.slice(0, 5);

    const extraPosts = displayPosts.length < posts.length ? posts.slice(5) : [];

    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <div className="level" style={{ marginBottom: 0 }}>
              <Link to="/" className="navbar-item level-item" title="Logo">
                <img
                  src={epstein}
                  alt="CIP"
                  style={{
                    maxHeight: 60,
                    width: "auto",
                    borderRadius: "50%",
                  }}
                />
                <div className="ml-3">
                  <p className="has-text-weight-bold">Energy Talking Points</p>
                  <p>by Alex Epstein</p>
                </div>
              </Link>
            </div>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${navBarActiveClass}`}
              data-target="navMenu"
              style={{ height: 84, width: 84 }}
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
            <div className="navbar-end has-text-centered">
              {displayPosts &&
                displayPosts.map(({ node: post }) => (
                  <Link
                    key={post.fields.slug}
                    className="navbar-item"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                ))}
              {extraPosts.length > 0 && !active ? (
                <span
                  className={`navbar-item navbar-more ${more ? "open" : ""}`}
                  onClick={() => this.toggleMore()}
                  style={more ? { transform: "rotate(180deg)" } : {}}
                >
                  <DownChevron />
                </span>
              ) : null}
              {!active && more ? (
                <div className="extra-posts">
                  {more
                    ? extraPosts.map(({ node: post }) => (
                        <Link
                          key={post.fields.slug}
                          className="navbar-item"
                          to={post.fields.slug}
                        >
                          {post.frontmatter.title}
                        </Link>
                      ))
                    : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default () => (
  <StaticQuery
    query={graphql`
      query NavBarQuery {
        allMarkdownRemark(sort: { frontmatter: { date: ASC } }) {
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
    render={(data, count) => <Navbar data={data} count={count} />}
  />
);
