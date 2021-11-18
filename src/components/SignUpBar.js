import React from "react";
import { Link } from "gatsby";

export default () => {
  return (
    <div className="text-is-centered">
      <iframe
        src="https://alexepstein.substack.com/embed"
        // width="480"
        // height="320"
        style={{
          background: "white",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          margin: "-20px 0 20px 10px",
        }}
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};
