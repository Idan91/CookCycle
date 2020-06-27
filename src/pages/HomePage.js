import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faHeart,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <React.Fragment>
      <div className="page home-page">
        <br />
        <div className="content-container">
          <div className="illustration"></div>
          <div className="home-page-caption-container">
            <h1 className="home-page-caption">Boost your cooking game</h1>
            <br />
            <h3 className="home-page-caption-subtitle">
              Find amazing recipes for the ingredients you have left at home
            </h3>
          </div>
        </div>
      </div>
      <div className="home-page-desc desc-1">
        <br />
        <br />
        <div className="centered-container desc-content">
          <h2 className="desc-title desc-title-1">
            Take home-cooking to the next level
          </h2>
          <div className="flex-container">
            <div className="flex-item desc-1-item">
              <FontAwesomeIcon icon={faUtensils} className="desc-1-item-icon" />
              <p className="desc-1-item-text">Explore great meal options</p>
            </div>
            <div className="flex-item desc-1-item">
              <FontAwesomeIcon icon={faHeart} className="desc-1-item-icon" />
              <p className="desc-1-item-text">Save your favorites</p>
            </div>
            <div className="flex-item desc-1-item">
              <FontAwesomeIcon
                icon={faShareSquare}
                className="desc-1-item-icon"
              />
              <p className="desc-1-item-text">Share your own recipes</p>
            </div>
          </div>
          <br />
          <div className="desc-1-bottom-text">
            <h3>Your all-in-one recipe app</h3>
          </div>
        </div>
      </div>
      <div className="home-page-desc desc-join">
        <br />
        <br />
        <div className="centered-container">
          <h2 className="desc-title desc-join-title">
            Join CookCycle for <span className="word-highlight">FREE</span> now!
          </h2>
          <br />
          <div className="navbar-item">
            <NavLink
              to="/sign-in"
              className="navbar-link navbar-link-sign-in sign-in-home-page"
              activeClassName="navbar-link-active"
            >
              <p>Sign In</p>
            </NavLink>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
