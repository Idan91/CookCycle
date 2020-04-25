import React from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <AppContext.Consumer>
      {(appContext) => {
        const drawNavbar = () => {
          let navbar = [];
          const pages = appContext[`${props.type}s`];

          pages.forEach((page, index) => {
            navbar.push(
              <li className="navbar-item" key={index}>
                <NavLink
                  to={appContext.createRouteFromPageName(page.name)}
                  className="navbar-link"
                  activeClassName="navbar-link-active"
                >
                  <p>{page.name}</p>
                </NavLink>
              </li>
            );
          });
          return navbar;
        };

        return (
          <div className="navbar">
            <div className="logo-conatainer">
              {/*Logo*/}
              <h1 className="navbar-item navbar-logo">CookCycle</h1>
            </div>
            <div className="navbar-list-container">
              <ul className="navbar-list">{drawNavbar()}</ul>
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Navbar;
