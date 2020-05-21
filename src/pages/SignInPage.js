import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import googleIcon from "../images/google_G.svg";

const SignInPage = () => {
  const { facebookSignIn, googleSignIn } = useContext(AuthContext);

  const renderSignInMethodButtons = () => {
    return (
      <React.Fragment>
        <button
          className="btn btn-sign-in2 btn-facebook link"
          onClick={facebookSignIn}
        >
          <FontAwesomeIcon icon={faFacebookF} className="facebook-icon" />
          &emsp;Sign in with Facebook
        </button>
        <br />
        <button
          className="btn btn-sign-in2 btn-google link"
          onClick={googleSignIn}
        >
          <img src={googleIcon} alt="" className="google-icon" />
          &emsp;Sign in with Google
        </button>
      </React.Fragment>
    );
  };

  return (
    <div className="page">
      <br />
      <div className="content-container">
        <div className="centered-container">
          <img className="signin-logo-img" alt="CookCycle" />
          <br />
          <br />
          <br />
          {renderSignInMethodButtons()}
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignInPage);
