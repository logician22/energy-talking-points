import React from "react";
import Layout from "../components/Layout";

export default () => {
  return (
    <Layout>
      <section className="section" style={{ backgroundColor: "#F5F8FA" }}>
        <div className="container columns">
          <div className="content column is-8 is-offset-2">
            <h1 className="is-size-1">Sign up</h1>
            <p className="is-size-5">
              Sign up for Alex Epstein's mailing list to get the latest talking
              points and other energy info, or{" "}
              <a href="https://alexepstein.substack.com">
                sign up on Alex's Subtack
              </a>{" "}
              if the below form doesn't work.
            </p>
          </div>
        </div>
      </section>

      <div className="container columns">
        <div className="content column is-8 is-offset-2">
          <iframe
            src="https://alexepstein.substack.com/embed"
            // width="480"
            // height="320"
            style={{
              background: "white",
              position: "relative",
              margin: "40px 0 40px 10px",
            }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
};
