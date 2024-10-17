// const { head } = require("lodash");

// require("dotenv").config({
//   path: ".env",
// });

const plugins = [
  "gatsby-plugin-react-helmet-async",
  "gatsby-plugin-sass",
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: `${__dirname}/static/img`,
      name: "uploads",
    },
  },
  // {
  //   resolve: "gatsby-source-filesystem",
  //   options: {
  //     path: `${__dirname}/src/pages/documents`,
  //     name: "pages",
  //   },
  // },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: `${__dirname}/src/img`,
      name: "images",
    },
  },
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        // {
        //   resolve: "gatsby-remark-relative-images",
        //   options: {
        //     name: "uploads",
        //   },
        // },
        {
          resolve: "gatsby-remark-images",
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            maxWidth: 2048,
          },
        },
        {
          resolve: "gatsby-remark-copy-linked-files",
          options: {
            destinationDir: "static",
          },
        },
        {
          resolve: "gatsby-remark-external-links",
        },
      ],
    },
  },
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp",
  "gatsby-plugin-image",
  {
    resolve: `gatsby-plugin-decap-cms`,
    options: {
      modulePath: `${__dirname}/src/cms/cms.js`,
    },
  },
  "gatsby-plugin-robots-txt",
  {
    resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
    options: {
      develop: false, // Activates purging in npm run develop
      purgeOnly: ["/all.scss"], // applies purging only on the bulma css file
    },
  }, // must be after other CSS plugins
  {
    resolve: "gatsby-plugin-google-tagmanager",
    options: {
      id: "GTM-TDDJQMJ",
    },
  },
];

if (process.env.NODE_ENV !== "development") {
  plugins.push({
    resolve: `gatsby-plugin-google-gtag`,

    options: {
      trackingIds: [process.env.GA_TRACKING_ID],
      gtagConfig: {
        anonymize_ip: true,
        cookie_expires: 0,
        head: true,
        respect,
      },
    },
  });
}

// // make sure to keep it last in the array)
// plugins.push("gatsby-plugin-netlify");

const siteUrl =
  (process.env.CONTEXT === "production"
    ? process.env.URL
    : process.env.DEPLOY_URL) || "http://localhost:8000";

console.log("DEPLOY URL", siteUrl);

// const config = {

//   plugins,
// };

module.exports = {
  siteMetadata: {
    title: "Energy Talking Points - Alex Epstein",
    description:
      "Energy policy, including climate policy, is one of the most important political issues today. I believe that the best policy for America’s future and the world’s future is a policy of energy freedom, in which all sources of energy--including fossil fuels--can compete to produce the most reliable, lowest-cost energy for billions of people.",
    siteUrl,
  },
  plugins: [
    "gatsby-plugin-react-helmet-async",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // {
          //   resolve: "gatsby-remark-relative-images",
          //   options: {
          //     name: "uploads",
          //   },
          // },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
          {
            resolve: "gatsby-remark-external-links",
          },
          "gatsby-plugin-sharp",
          "gatsby-plugin-image",
          "gatsby-transformer-sharp",
          {
            resolve: `gatsby-plugin-decap-cms`,
            options: {
              modulePath: `${__dirname}/src/cms/cms.js`,
            },
          },
          "gatsby-plugin-robots-txt",
          {
            resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
            options: {
              develop: false, // Activates purging in npm run develop
              purgeOnly: ["/all.scss"], // applies purging only on the bulma css file
            },
          }, // must be after other CSS plugins
          {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
              id: "GTM-TDDJQMJ",
            },
          },
        ],
      },
    },
    process.env.NODE_ENV === "development"
      ? undefined
      : {
          resolve: `gatsby-plugin-google-gtag`,

          options: {
            trackingIds: [process.env.GA_TRACKING_ID],
            gtagConfig: {
              anonymize_ip: true,
              cookie_expires: 0,
              head: true,
              respect,
            },
          },
        },
    "gatsby-plugin-netlify",
    // other plugins
  ].filter(Boolean),
};
