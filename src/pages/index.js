import React, { useState } from "react";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import SignUpBar from "../components/SignUpBar";

const BlogIndexPage = () => {
  const [search, setSearch] = useState("");
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
                <br />
                Sign up for Alex Epstein's mailing list to get the latest
                talking points and other energy info, or{" "}
                <a href="https://alexepstein.substack.com">
                  sign up on Alex's Substack
                </a>{" "}
                if the form below doesn't work.
                <span
                  style={{
                    fontStyle: "italic",
                    marginTop: "15px",
                    display: "block",
                  }}
                >
                  - Alex Epstein
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <SignUpBar />

      <section className="section has-background-light">
        <div className="container">
          <div className="content">
            <div className="columns">
              <div
                className="column is-4 is-offset-4"
                style={{ marginBottom: 30 }}
              >
                <input
                  className="input is-large is-link"
                  type="text"
                  placeholder="Search talking points..."
                  onChange={({ target }) => {
                    setSearch(target.value);
                  }}
                  value={search}
                />
              </div>
            </div>
            <BlogRoll search={search} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogIndexPage;
