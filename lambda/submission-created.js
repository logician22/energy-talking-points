const fetch = require("node-fetch");
require("dotenv").config({
  path: ".env",
});

// For more info, check https://docs.netlify.com/functions/build-with-javascript
module.exports.handler = async function (event) {
  const payload = JSON.parse(event.body).payload.data;
  const { HUBSPOT_FORM_ID, HUBSPOT_API_KEY, HUBSPOT_PORTAL_ID } = process.env;

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

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}?hapikey=${HUBSPOT_API_KEY}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content Type": "application/json",
      },
    });
    const json = await res.json();
    return {
      // return null to show no errors
      statusCode: 200, // http status code
      body: JSON.stringify(json),
    };
  } catch (err) {
    console.log("ERROR", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};
