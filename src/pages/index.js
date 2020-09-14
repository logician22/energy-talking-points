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
          <h1 className="has-text-weight-bold is-size-1 has-background-primary has-text-white banner-text">
            Energy Talking Points
          </h1>
        </div>
        <section className="section has-background-white has-">
          <div className="container">
            <div className="content" style={{ textAlign: "center" }}>
              <h3 className="is-size-3">Welcome to EnergyTalkingPoints.com</h3>
              <div className="columns">
                <p className="is-size-5 column is-6 is-offset-3">
                  The goal of this site is to give you true, powerful, and
                  succinct talking points on this year's most important energy,
                  environmental, and climate issues.
                  <br />
                  <p style={{ fontStyle: "italic", marginTop: "15px" }}>
                    - Alex Epstein
                  </p>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section has-background-light">
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
