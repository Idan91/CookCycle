import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RecipesPage from "../pages/RecipesPage";

export const AppContext = React.createContext();

class AppContextProvider extends Component {
  state = {
    homePages: [
      {
        name: "Register",
        component: HomePage,
      },
      {
        name: "Login",
        component: HomePage,
      },
    ],
    userPages: [
      {
        name: "Recipes",
        component: RecipesPage,
      },
      {
        name: "Preferences",
        component: HomePage,
      },
      {
        name: "Account",
        component: HomePage,
      },
    ],
    navbarTypes: ["homePage", "userPage"],
  };

  createRouteFromPageName = (pageName) => {
    return `/${pageName.replace(/\s+/g, "-").toLowerCase()}`;
  };

  populateRoutes = (navbarType) => {
    const stateProperty = `${navbarType}s`;
    const navbarPages = this.state[stateProperty];

    let routes = [];

    navbarPages.forEach((page, index) => {
      const routePath = this.createRouteFromPageName(page.name);

      routes.push(
        <Route key={index} path={routePath} component={page.component} />
      );
    });

    return routes;
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          createRouteFromPageName: this.createRouteFromPageName,
          populateRoutes: this.populateRoutes,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
