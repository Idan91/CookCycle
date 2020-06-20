import React from "react";
import { HashRouter } from "react-router-dom";
import AppContextProvider from "./contexts/AppContext";
import AuthContextProvider from "./contexts/AuthContext";
import ReciepsContextProvider from "./contexts/RecipesContext";
import CookCycle from "./CookCycle";
import UserContextProvider from "./contexts/UserContext";
import AccountContextProvider from "./contexts/AccountContext";

const App = () => {
  return (
    <HashRouter basename="/">
      <AppContextProvider>
        <AuthContextProvider>
          <UserContextProvider>
            <AccountContextProvider>
              <ReciepsContextProvider>
                <React.Fragment>
                  <CookCycle />
                </React.Fragment>
              </ReciepsContextProvider>
            </AccountContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </HashRouter>
  );
};

export default App;
