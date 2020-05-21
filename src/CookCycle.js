import React, { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import { AuthContext } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const CookCycle = () => {
  const { renderRouterSwitch, navbarTypes } = useContext(AppContext);
  const { isSignedIn } = useContext(AuthContext);

  let navbarType = isSignedIn ? navbarTypes[1] : navbarTypes[0];

  return (
    <React.Fragment>
      <Navbar type={navbarType} />
      {/* {renderRouterSwitch("home")}
      {isSignedIn === true && renderRouterSwitch("user")} */}
      {renderRouterSwitch()}
      <Footer />
    </React.Fragment>
  );
};

export default CookCycle;
