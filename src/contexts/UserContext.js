import React, { useState, useEffect, useContext } from "react";
import Axios from "../util/axios";
import { AuthContext } from "./AuthContext";

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isSignedIn && currentUser) {
      Axios.post("/user/data", { email: currentUser.email })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          console.error(err);
        });

      console.log(userData);
    }
  }, [isSignedIn, currentUser, userData]);

  return (
    <UserContext.Provider value={{ userData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
