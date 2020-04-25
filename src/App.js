import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import AppContextProvider from "./context/AppContext";
import { AppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

class App extends Component {
  state = {
    navbarType: "userPage",
  };

  render() {
    return (
      <React.Fragment>
        <HashRouter basename="/">
          <AppContextProvider>
            <Navbar type={this.state.navbarType} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <AppContext.Consumer>
                {(appContext) => {
                  return appContext.populateRoutes(this.state.navbarType);
                }}
              </AppContext.Consumer>
            </Switch>
            <Footer />
          </AppContextProvider>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default App;
