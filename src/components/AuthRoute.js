import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { AppContext } from "../contexts/AppContext";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  const { validateSignIn } = useContext(AuthContext);
  const { mainUserRoute } = useContext(AppContext);

  const loggedIn = validateSignIn();

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Redirect to={mainUserRoute} /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
