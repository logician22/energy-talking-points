import React, { useState } from "react";
import { Link } from "gatsby";

export default () => (
  <div className="sign-up-bar text-is-centered">
    <Link to="/sign-up">
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h4 className="is-size-4">Sign up for notifications!</h4>
            </div>
          </div>
        </div>
      </section>
    </Link>
  </div>
);
