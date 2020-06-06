import React, { useState, useEffect, useContext } from "react";
import Axios from "../util/axios";
import { AuthContext } from "./AuthContext";

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [profileFields, setProfileFields] = useState([
    {
      name: "Saved Recipes",
      value: 0,
      active: true,
    },
    // {
    //   name: "Allergies",
    //   value: [],
    //   active: false,
    // },
  ]);

  const selectProfileField = (event) => {
    let { target } = event;

    while (!target.classList.value.includes("profile-field ")) {
      target = target.parentNode;
    }
    const selectedField = target.getAttribute("name");

    const updatedProfileFields = profileFields.map((field) => {
      if (field.name === selectedField) {
        field.active = true;
      } else {
        field.active = false;
      }
      return field;
    });

    // console.log(updatedProfileFields);

    setProfileFields(updatedProfileFields);
  };

  useEffect(() => {
    if (isSignedIn && currentUser) {
      if (!userData) {
        Axios.post("/user/data", { email: currentUser.email })
          .then((response) => {
            setUserData(response.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [isSignedIn, currentUser, userData]);

  return (
    <UserContext.Provider
      value={{ userData, profileFields, selectProfileField }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
