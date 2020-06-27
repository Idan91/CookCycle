import React from "react";
import { HashRouter } from "react-router-dom";
import AppContextProvider from "./contexts/AppContext";
import AuthContextProvider from "./contexts/AuthContext";
import ReciepsContextProvider from "./contexts/RecipesContext";
import CookCycle from "./CookCycle";
import UserContextProvider from "./contexts/UserContext";

const App = () => {
  return (
    <HashRouter basename="/">
      <AppContextProvider>
        <AuthContextProvider>
          <UserContextProvider>
            <ReciepsContextProvider>
              <React.Fragment>
                <CookCycle />
              </React.Fragment>
            </ReciepsContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </HashRouter>
  );
};

export default App;
