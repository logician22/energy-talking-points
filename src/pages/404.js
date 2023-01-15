import React from "react";
import { Link } from "gatsby";

import Layout from "../components/Layout";

const NotFoundPage = () => (
  <Layout>
    <section className="section" style={{ minHeight: 600 }}>
      <div className="container">
        <div className="content has-text-centered is-vcentered">
          <h1 className="is-size-1">NOT FOUND</h1>
          <p className="is-size-5">
            You just hit a route that doesn&#39;t exist.{" "}
            <Link to="/">Go back home</Link>.
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;
