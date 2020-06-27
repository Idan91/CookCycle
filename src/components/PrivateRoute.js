import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  const { validateSignIn } = useContext(AuthContext);

  const loggedIn = validateSignIn();

  return (
    <Route
      {...rest}
      render={(props) =>
        !loggedIn ? <Redirect to="/sign-in" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
