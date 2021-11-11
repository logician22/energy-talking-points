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
              <a href="mailto:alex@alexepstein.com">email Alex</a> if the below
              form doesn't work.
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
              // transform: "translateX: -50%",
              // left: "50%",
              position: "relative",
              margin: "40px 0 40px 10px",
            }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
          {/* <iframe
            id="JotFormIFrame-211754736208053"
            title="Alex Epstein - Email Subscribe Form - Simple "
            onLoad={() => {
              window.parent.scrollTo(0, 0);
            }}
            allowtransparency="true"
            allowFullScreen={true}
            allow="geolocation; microphone; camera"
            src="https://form.jotform.com/211754736208053"
            frameBorder="0"
            style={{
              minWidth: "100%",
              height: "539px",
              border: "none",
            }}
            scrolling="no"
          ></iframe> */}
        </div>
      </div>
    </Layout>
  );
};
