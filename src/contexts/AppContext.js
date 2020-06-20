import React, { Component } from "react";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import RecipesPage from "../pages/RecipesPage";
import AccountPage from "../pages/AccountPage";
import AuthRoute from "../components/AuthRoute";
import UserPage from "../pages/UserPage";
import PrivateRoute from "../components/PrivateRoute";

export const AppContext = React.createContext();

class AppContextProvider extends Component {
  state = {
    homePages: [
      // {
      //   name: "Home",
      //   component: HomePage,
      //   type: "auth",
      // },
      {
        name: "Sign In",
        component: SignInPage,
        type: "auth",
      },
    ],
    userPages: [
      {
        name: "My CookCycle",
        component: UserPage,
        type: "private",
      },
      {
        name: "Recipes",
        component: RecipesPage,
        type: "private",
      },
      {
        name: "Account",
        component: AccountPage,
        type: "private",
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
    if (pageName === "Home") {
      return "/";
    } else {
      return `/${pageName.replace(/\s+/g, "-").toLowerCase()}`;
    }
  };

  // populateRoutes = (navbarType) => {
  populateRoutes = () => {
    // const stateProperty = `${navbarType}s`;
    // const navbarPages = this.state[stateProperty];

    let routes = [];

    const addRoutesToArray = (pages) => {
      pages.forEach((page, index) => {
        const routePath = this.createRouteFromPageName(page.name);

        if (page.type === "auth") {
          routes.push(
            <AuthRoute
              key={page.name}
              path={routePath}
              component={page.component}
            />
          );
        } else if (page.type === "private") {
          routes.push(
            <PrivateRoute
              key={page.name}
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
    return (
      <React.Fragment>
        <AuthRoute exact path="/" component={HomePage} />
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
