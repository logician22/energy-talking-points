import React from "react";
import { Helmet } from "react-helmet";
import { Location } from "@reach/router";
import { withPrefix } from "gatsby";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.scss";
import useSiteMetadata from "./SiteMetadata";
import { removeTrailingSlash } from "../utils";

const TemplateWrapper = ({ children, passedData = {} }) => {
  const siteMetadata = useSiteMetadata();
  const title = passedData.title
    ? `Energy Talking Points - ${passedData.title}`
    : siteMetadata.title;
  const description = passedData.description || siteMetadata.description;
  const img = passedData.image
    ? passedData.image[0] === "/"
      ? passedData.image.slice(1)
      : passedData.image
    : "img/energy.jpg";

  return (
    <Location>
      {({ location }) => {
        const origin = removeTrailingSlash(location.origin || "");
        const { href } = location;

        return (
          <div>
            <Helmet>
              <html lang="en" />
              <title>{title}</title>
              <meta name="description" content={description} />

              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href={`${withPrefix("/")}img/apple-touch-icon.png`}
              />
              <link
                rel="icon"
                type="image/png"
                href={`${withPrefix("/")}img/favicon2-32x32.png`}
                sizes="32x32"
              />
              <link
                rel="icon"
                type="image/png"
                href={`${withPrefix("/")}img/favicon2-16x16.png`}
                sizes="16x16"
              />

              <link
                rel="mask-icon"
                href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
                color="#ff4400"
              />
              <meta name="theme-color" content="#fff" />
              <meta name="description" content={description} />

              <meta property="og:type" content="website" />
              <meta property="og:title" content={title} />
              <meta property="og:url" content={href} />
              <meta property="og:image" content={`${withPrefix("/")}${img}`} />

              <meta name="twitter:url" content={href} />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:creator" content="@AlexEpstein" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
              <meta
                name="twitter:image"
                content={`${origin}${withPrefix("/")}${img}`}
              />
            </Helmet>
            <Navbar />
            <div>{children}</div>
            <Footer />
          </div>
        );
      }}
    </Location>
  );
};

export default TemplateWrapper;
