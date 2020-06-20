import React from "react";

const Page = (props) => {
  return (
    <React.Fragment>
      <div className="page">
        <div className="content-container">
          <div className="centered-container">
            {props.title && (
              <React.Fragment>
                <br />
                <h2>{props.title}</h2>
              </React.Fragment>
            )}
            <br />
            {props.children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Page;
