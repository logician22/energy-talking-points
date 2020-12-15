import React from "react";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import SignUpBar from "../components/SignUpBar";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section has-background-white has-">
          <div className="container">
            <div className="content" style={{ textAlign: "center" }}>
              <h2
                className="welcome-text is-color-primary"
                style={{ marginTop: 20 }}
              >
                Welcome to EnergyTalkingPoints.com
              </h2>
              <div className="columns">
                <p className="is-size-5 column is-6 is-offset-3">
                  The goal of this site is to give you true, powerful, and
                  succinct talking points on today's most important energy,
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

        <SignUpBar />

        <section className="section has-background-light">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
