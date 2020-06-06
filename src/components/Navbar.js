import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  const appContext = useContext(AppContext);

  const drawNavbar = () => {
    let navbar = [];
    const pages = appContext[`${props.type}s`];

    pages.forEach((page, index) => {
      if (page.name !== "Home") {
        navbar.push(
          <li className="navbar-item" key={index}>
            <NavLink
              // to={appContext.createRouteFromPageName(page.name)}
              to={page.route}
              className={`navbar-link ${
                page.name === "Sign In" && "navbar-link-sign-in"
              }`}
              activeClassName="navbar-link-active"
            >
              <p>{page.name}</p>
            </NavLink>
          </li>
        );
      }
    });
    return navbar;
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <NavLink
          to={props.type === "homePage" ? "/" : appContext.mainUserRoute}
        >
          <img
            className="navbar-item navbar-logo navbar-logo-img"
            alt="CookCycle"
          />
        </NavLink>
      </div>
      <div className="navbar-list-container">
        <ul className="navbar-list">{drawNavbar()}</ul>
      </div>
    </div>
  );
};

export default Navbar;
