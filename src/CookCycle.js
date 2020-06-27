import React, { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import { AuthContext } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const CookCycle = (props) => {
  const { renderRouterSwitch, navbarTypes } = useContext(AppContext);
  const { validateSignIn } = useContext(AuthContext);

  const loggedIn = validateSignIn();

  const navbarType = loggedIn ? navbarTypes[1] : navbarTypes[0];

  return (
    <React.Fragment>
      <Navbar type={navbarType} />
      {renderRouterSwitch()}
      <Footer />
    </React.Fragment>
  );
};

export default CookCycle;
