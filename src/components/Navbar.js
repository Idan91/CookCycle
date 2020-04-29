import React from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
import logoHorizontal from "../images/Logo_Horizontal.svg";
import logotype from "../images/LogoType.svg";

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
              <NavLink to="/">
                <img
                  // src={logoHorizontal}
                  // width="200px"
                  className="navbar-item navbar-logo navbar-logo-img"
                  // alt="CookCycle"
                />
              </NavLink>
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
