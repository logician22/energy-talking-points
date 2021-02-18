import React from "react";
import Layout from "../components/Layout";

export default () => (
  <Layout>
    <section className="section" style={{ backgroundColor: "#F5F8FA" }}>
      <div className="container columns">
        <div className="content column is-8 is-offset-2">
          <h1 className="is-size-1">Sign up</h1>
          <p className="is-size-5">
            Sign up for Alex Epstein's mailing list to get the latest talking
            points and other energy info, or{" "}
            <a href="mailto:alex@alexepstein.com">email Alex</a> if the below
            form doesn't work.
          </p>
        </div>
      </div>
    </section>

    <iframe
      title="sign-up"
      id="innerFrame"
      name="innerFrame"
      sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads"
      frameBorder="0"
      allowFullScreen=""
      src="https://share.hsforms.com/1fX7Wqv5XQSy6dT897kDYOw1rpyx"
      style={{ overflow: "auto", width: "100%", minHeight: "700px" }}
    ></iframe>
  </Layout>
);
