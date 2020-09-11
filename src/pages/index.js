import React from "react";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import SignUpBar from "../components/SignUpBar";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0 margin-bottom-0"
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1 has-background-primary has-text-white"
            style={{
              boxShadow: "0.5rem 0 0 #4DAA9F, -0.5rem 0 0 #4DAA9F",
              padding: "1rem",
            }}
          >
            Energy Talking Points
          </h1>
        </div>
        <section className="section has-background-light">
          <div className="container">
            <div className="content" style={{ textAlign: "center" }}>
              <h3 className="is-size-3">Start Here</h3>
              <div className="columns">
                <p className="is-size-5 column is-6 is-offset-3">
                  Read <Link to="/overview/">the overview</Link> for info on
                  these talking points and how to use them, or{" "}
                  <Link to="/sign-up/">sign up</Link> for more energy info.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
        <SignUpBar />
      </Layout>
    );
  }
}
