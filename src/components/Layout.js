import React from "react";
import { Helmet } from "react-helmet";
import { Location } from "@reach/router";
import { withPrefix } from "gatsby";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";
import { removeTrailingSlash } from "../utils";

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <Location>
      {({ location }) => {
        console.log(location);
        const origin = removeTrailingSlash(location.origin);
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
                href={`${withPrefix("/")}img/favicon-32x32.png`}
                sizes="32x32"
              />
              <link
                rel="icon"
                type="image/png"
                href={`${withPrefix("/")}img/favicon-16x16.png`}
                sizes="16x16"
              />

              <link
                rel="mask-icon"
                href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
                color="#ff4400"
              />
              <meta name="theme-color" content="#fff" />

              <meta property="og:type" content="website" />
              <meta property="og:title" content={title} />
              <meta property="og:url" content={origin} />
              <meta
                property="og:image"
                content={`${withPrefix("/")}img/og-image.jpg`}
              />
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:creator" content="@Alexepstein" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
              <meta
                name="twitter:image"
                content={`${origin}${withPrefix("/")}img/og-image.jpg`}
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
