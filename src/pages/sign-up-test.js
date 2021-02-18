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

    let res;
    console.log(form);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: encode({
        "form-name": "submission-created",
        ...form,
      }),
    })
      .then((response) => {
        res = response;
        console.log("RES SENT");
        return res.json();
      })
      .then((json) => {
        console.log("HIT JSON", json);
        if (
          (json.status && json.status >= 300) ||
          (res.status && res.status >= 300)
        ) {
          console.log("JSON ERROR", json, res);
          setForm({ ...form, error: true });
          return;
        }

        console.log("SUCCESS", json);
        setForm({ ...emptySet, success: true });
      })
      .catch((err) => {
        console.log("ERROR", err, res);
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
            {form.error ? (
              <p className="is-size-6 mb-4">
                Something went wrong! Please{" "}
                <a href="mailto:alex@alexepstein.com">let us know</a>.
              </p>
            ) : null}
            <form
              name="submission-created"
              method="post"
              className="form"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <input
                  type="hidden"
                  name="form-name"
                  value="submission-created"
                />
              </div>
              <div className="field">
                <label className="label">First name</label>
                <input
                  className="input"
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={(e) => setFormVal("firstname", e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Last name</label>
                <input
                  className="input"
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={(e) => setFormVal("lastname", e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Email*</label>
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
                  name="jobtitle"
                  value={form.jobtitle}
                  onChange={(e) => setFormVal("jobtitle", e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Company name</label>
                <input
                  className="input"
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={(e) => setFormVal("company", e.target.value)}
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
    </Layout>
  );
};
