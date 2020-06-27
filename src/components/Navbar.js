import React, { useContext, useRef, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  const appContext = useContext(AppContext);

  const burger = useRef(null);

  const drawNavbar = () => {
    let navbar = [];
    const pages = appContext[`${props.type}s`];

    pages.forEach((page, index) => {
      if (page.name !== "Home") {
        navbar.push(
          <li className="navbar-item" key={index}>
            <NavLink
              to={page.route}
              className={`navbar-link ${
                page.name === "Sign In" && "navbar-link-sign-in"
              }`}
              activeClassName="navbar-link-active"
              onClick={onBurgerClick}
            >
              <p>{page.name}</p>
            </NavLink>
          </li>
        );
      }
    });
    return navbar;
  };

  const onBurgerClick = (event) => {
    // TOGGLE NAVBAR CONTENT
    const navbarContent = document.querySelector(".navbar-content");
    navbarContent.classList.toggle("navbar-active");

    // BURGER ANIMATION
    const burger = document.querySelector(".burger");
    if (burger) {
      burger.classList.toggle("burger-toggle");
    }
  };

  // useEffect(() => {
  //   if (window.innerWidth <= 800) {
  //     const navbarContent = document.querySelector(".navbar-content");
  //     if (navbarContent) {
  //       navbarContent.style.height =
  //         document.documentElement.scrollHeight.toString() + "px";
  //     }
  //   }
  // }, [burger]);

  return (
    <nav className="navbar">
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
      <div className="navbar-content">
        <ul className="navbar-list">{drawNavbar()}</ul>
      </div>
      <div ref={burger} className="burger" onClick={onBurgerClick}>
        <div className="burger-line1"></div>
        <div className="burger-line2"></div>
        <div className="burger-line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
