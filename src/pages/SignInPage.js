import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import googleIcon from "../images/google_G.svg";
import logoHero from "../images/Logo_Hero.svg";

const SignInPage = () => {
  const renderSignInMethods = () => {
    return (
      <React.Fragment>
        {/* <img src={logoHero} width="200px" alt="CookCycle" /> */}
        <button className="btn btn-sign-in2 btn-facebook link">
          <FontAwesomeIcon icon={faFacebookF} className="facebook-icon" />
          &emsp;Sign in with Facebook
        </button>
        <br />
        <button className="btn btn-sign-in2 btn-google link">
          <img src={googleIcon} alt="" className="google-icon" />
          &emsp;Sign in with Google
        </button>
      </React.Fragment>
    );
  };

  return (
    <div className="page">
      {/* <h1 className="page-title">Sign In</h1> */}
      <br />
      <div className="content-container">
        <div className="centered-container">
          <img src={logoHero} width="300px" className="logo" alt="CookCycle" />
          <br />
          <br />
          <br />
          {renderSignInMethods()}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
