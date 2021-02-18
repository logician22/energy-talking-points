const fetch = require("node-fetch");
require("dotenv").config({
  path: ".env",
});

// For more info, check https://docs.netlify.com/functions/build-with-javascript
module.exports.handler = async function (event, context) {
  const payload = JSON.parse(event.body).payload.data;
  const { HUBSPOT_FORM_ID, HUBSPOT_API_KEY, HUBSPOT_PORTAL_ID } = process.env;
  console.log("payload", payload);

  const fields = ["firstname", "lastname", "email", "jobtitle", "company"].map(
    (field) => ({
      name: field,
      value: payload[field],
    })
  );

  const data = {
    fields,
    context: {
      pageUri: "https://energytalkingpoints.com/sign-up",
      pageName: "Sign up",
    },
  };
  console.log("data", data);
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}?hapikey=${HUBSPOT_API_KEY}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log({ res });
    let json;
    let text;
    try {
      json = await res.json();
    } catch (e) {
      console.log("jsone", e);
    }
    console.log("json", json);

    try {
      text = await res.text();
    } catch (e) {
      console.log("texte", e);
    }

    return {
      // return null to show no errors
      statusCode: 200, // http status code
      body: JSON.stringify(json),
    };
  } catch (err) {
    console.log("err", err);
    console.log(payload);
  }
};

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum
