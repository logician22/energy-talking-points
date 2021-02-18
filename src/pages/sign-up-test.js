import React, { useState } from "react";
import Layout from "../components/Layout";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default () => {
  const [form, setForm] = useState({});
  const setFormVal = (key, val) => {
    setForm({ ...form, [key]: val, error: undefined, success: undefined });
  };

  const emptySet = Object.keys(form)
    .filter((k) => !["success", "error"].includes(k))
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: "",
      }),
      {}
    );

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "subscribe",
        ...form,
      }),
    })
      .then(() => {
        setForm({ ...emptySet, success: true });
      })
      .catch(() => {
        setForm({ ...form, error: true });
      });
  };

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

      <section className="section">
        <div className="container columns">
          <div className="content column is-8 is-offset-2">
            {form.success ? (
              <p className="is-size-6 mb-4">
                Your information was submitted successfully.
              </p>
            ) : null}
            <form
              name="subscribe"
              method="post"
              className="form"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <input type="hidden" name="form-name" value="subscribe" />
              </div>
              <div className="field">
                <label className="label">First name</label>
                <input
                  className="input"
                  type="text"
                  name="first_name"
                  value={form.firstName}
                  onChange={(e) => setFormVal("firstName", e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Last name</label>
                <input
                  className="input"
                  type="text"
                  name="last_name"
                  value={form.lastName}
                  onChange={(e) => setFormVal("lastName", e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={(e) => setFormVal("email", e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Job title</label>
                <input
                  className="input"
                  type="text"
                  name="job_title"
                  value={form.jobTitle}
                  onChange={(e) => setFormVal("jobTitle", e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Company name</label>
                <input
                  className="input"
                  type="text"
                  name="company_name"
                  value={form.companyName}
                  onChange={(e) => setFormVal("companyName", e.target.value)}
                />
              </div>

              <div className="field mt-5">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Subscribe now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* <iframe
      title="sign-up"
      id="innerFrame"
      name="innerFrame"
      sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads"
      frameBorder="0"
      allowFullscreen=""
      src="https://share.hsforms.com/1fX7Wqv5XQSy6dT897kDYOw1rpyx"
      style={{ overflow: "auto", width: "100%", minHeight: "700px" }}
    ></iframe> */}
    </Layout>
  );
};
