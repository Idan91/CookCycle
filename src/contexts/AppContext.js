import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import RecipesPage from "../pages/RecipesPage";
import AccountPage from "../pages/AccountPage";
import AuthRoute from "../components/AuthRoute";
import UserPage from "../pages/UserPage";
import PreferencesPage from "../pages/PreferencesPage";
import PrivateRoute from "../components/PrivateRoute";

export const AppContext = React.createContext();

class AppContextProvider extends Component {
  state = {
    homePages: [
      {
        name: "Sign In",
        component: SignInPage,
      },
    ],
    userPages: [
      {
        name: "My CookCycle",
        component: UserPage,
      },
      {
        name: "Recipes",
        component: RecipesPage,
      },
      {
        name: "Preferences",
        component: PreferencesPage,
      },
      {
        name: "Account",
        component: AccountPage,
      },
    ],
    navbarTypes: ["homePage", "userPage"],
    mainUserRoute: "/",
  };

  UNSAFE_componentWillMount() {
    const { homePages, userPages } = this.state;

    homePages.forEach((page) => {
      page.route = this.createRouteFromPageName(page.name);
    });
    userPages.forEach((page) => {
      page.route = this.createRouteFromPageName(page.name);
    });

    this.setState({
      homePages,
      userPages,
      mainUserRoute: userPages[0].route,
    });
  }

  createRouteFromPageName = (pageName) => {
    return `/${pageName.replace(/\s+/g, "-").toLowerCase()}`;
  };

  // populateRoutes = (navbarType) => {
  populateRoutes = () => {
    // const stateProperty = `${navbarType}s`;
    // const navbarPages = this.state[stateProperty];

    let routes = [];

    const addRoutesToArray = (pages) => {
      pages.forEach((page, index) => {
        const routePath = this.createRouteFromPageName(page.name);

        if (page.name === "Sign In") {
          routes.push(
            <AuthRoute
              key={index}
              path={routePath}
              component={page.component}
            />
          );
        } else {
          routes.push(
            <PrivateRoute
              key={index}
              path={routePath}
              component={page.component}
            />
          );
        }
      });
    };

    addRoutesToArray(this.state.homePages);
    addRoutesToArray(this.state.userPages);

    return routes;
  };

  renderRouterSwitch = (type) => {
    // const { navbarTypes } = this.state;
    // let navbarType = type === "home" ? navbarTypes[0] : navbarTypes[1];

    // if (type === "user") {
    //   return (
    //     <React.Fragment>
    //       <Switch>{this.populateRoutes(navbarType)}</Switch>
    //     </React.Fragment>
    //   );
    // } else if (type === "home") {
    //   return (
    //     <React.Fragment>
    //       <Switch>
    //         <Route exact path="/" component={HomePage} />
    //         {this.populateRoutes(navbarType)}
    //       </Switch>
    //     </React.Fragment>
    //   );
    // }
    return (
      <React.Fragment>
        <Route exact path="/" component={HomePage} />
        {this.populateRoutes()}
      </React.Fragment>
    );
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          createRouteFromPageName: this.createRouteFromPageName,
          renderRouterSwitch: this.renderRouterSwitch,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
