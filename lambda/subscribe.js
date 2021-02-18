// require("dotenv").config({
//   path: ".env",
// });

// For more info, check https://docs.netlify.com/functions/build-with-javascript
module.exports.handler = async function (event, context) {
  console.log("queryStringParameters", event.queryStringParameters);
  console.log("event", event.event);
  console.log(context);
  console.log(process.env);
  // const { HUBSPOT_FORM_ID, HUBSPOT_API_KEY } = process.env;
  // console.log("process.env", { HUBSPOT_API_KEY, HUBSPOT_FORM_ID });

  // const data = {};

  return {
    statusCode: 200,
    body: JSON.stringify({ hello: "world", event, context, env: process.env }),
  };
  // const fetch(
  //   `https://api.hubapi.com/forms/v2/forms/${HUBSPOT_FORM_ID}/?hapikey=${HUBSPOT_API_KEY}`
  // )
  //   .then((res) => {
  //     console.log("RES", res);
  //     return res.json();
  //   })
  //   .then((json) => {
  //     console.log("json", json);
  //     callback(null, {
  //       // return null to show no errors
  //       statusCode: 200, // http status code
  //       body: JSON.stringify(json),
  //     });
  //   });
};

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum
