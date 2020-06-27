import React from "react";
import Page from "./Page";

const Error404Page = () => {
  return (
    <Page>
      <h1 className="error-404">404</h1>
      <h2 className="error-404-description">
        Woops...this page isn't available
      </h2>
      <h3>Cycle back to one of the other pages!</h3>
    </Page>
  );
};

export default Error404Page;
