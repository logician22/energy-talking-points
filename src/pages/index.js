import React, { useState, useEffect } from "react";
import { debounce } from "lodash";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll/index";
import SignUpBar from "../components/SignUpBar";

const BlogIndexPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const debounced = debounce(() => {
      setDebouncedSearch(search);
    }, 500);
    debounced();
    return debounced.cancel;
  }, [search]);

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
                environmental, and climate issues. Subscribe to get the latest
                talking points delivered to your Inbox.
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
            <BlogRoll search={debouncedSearch} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogIndexPage;
