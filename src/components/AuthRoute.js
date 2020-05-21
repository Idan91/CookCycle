import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { AppContext } from "../contexts/AppContext";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  const { isSignedIn } = useContext(AuthContext);
  const { mainUserRoute } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isSignedIn === true ? (
          <Redirect to={mainUserRoute} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
