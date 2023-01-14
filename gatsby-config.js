require("dotenv").config({
  path: ".env",
});

const plugins = [
  "gatsby-plugin-react-helmet",
  "gatsby-plugin-sass",
  {
    // keep as first gatsby-source-filesystem plugin for gatsby image support
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
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp",
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        {
          resolve: "gatsby-remark-relative-images",
          options: {
            name: "uploads",
          },
        },
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
  {
    resolve: "gatsby-plugin-netlify-cms",
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
    resolve: "gatsby-plugin-web-font-loader",
    options: {
      google: {
        families: ["Lato:ital,wght@0,400;0,700;1,400"],
      },
    },
  },
  {
    resolve: "gatsby-plugin-google-tagmanager",
    options: {
      id: "GTM-TDDJQMJ",
    },
  },
  {
    resolve: "gatsby-plugin-sitemap",
    options: {
      query: `
      {
        allSitePage {
          node {
            path
          }
        }
      }`,
      serialize: ({ path }) => {
        return {
          url: path,
        }
      },
    },
  },
];

if (process.env.NODE_ENV !== "development") {
  plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      // The property ID; the tracking code won't be generated without it
      trackingId: process.env.GA_TRACKING_ID,
      // Required to verify Google search console
      head: true,
      // Setting this parameter is optional
      anonymize: true,
      // Setting this parameter is also optional
      respectDNT: true,
    },
  });
}

// make sure to keep it last in the array)
plugins.push("gatsby-plugin-netlify");

const siteUrl =
  (process.env.CONTEXT === "production"
    ? process.env.URL
    : process.env.DEPLOY_URL) || "http://localhost:8000";
console.log("DEPLOY URL", siteUrl);

const config = {
  siteMetadata: {
    title: "Energy Talking Points - Alex Epstein",
    description:
      "Energy policy, including climate policy, is one of the most important political issues today. I believe that the best policy for America’s future and the world’s future is a policy of energy freedom, in which all sources of energy--including fossil fuels--can compete to produce the most reliable, lowest-cost energy for billions of people.",
    siteUrl,
  },
  plugins,
};

module.exports = config;
