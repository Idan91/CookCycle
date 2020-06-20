import React, { useState, useEffect, useContext } from "react";
import Axios from "../util/axios";
import { AuthContext } from "./AuthContext";
import { cookcycleApiCall } from "../util/fetch";

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recipeFocusVisible, setRecipeFocusVisible] = useState(false);

  const [recipesUpdated, setRecipesUpdated] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [savedRecipes, setSavedRecipes] = useState([]);

  const [profileFields, setProfileFields] = useState([
    {
      name: "Saved Recipes",
      value: savedRecipes.length,
      active: true,
    },
    // {
    //   name: "Allergies",
    //   value: [],
    //   active: false,
    // },
  ]);

  const showRecipeFocus = () => {
    setRecipeFocusVisible(true);
  };

  const hideRecipeFocus = () => {
    setRecipeFocusVisible(false);
  };

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

  const updateSavedRecipeField = (recipeCount) => {
    let currentProfileFields = [];

    profileFields.forEach((field) => {
      let newValue = field.value;

      if (field.name === "Saved Recipes") {
        newValue = recipeCount;
      }

      let newField = {
        name: field.name,
        value: newValue,
        active: field.active,
      };

      currentProfileFields.push(newField);
    });

    setProfileFields(currentProfileFields);
  };

  useEffect(() => {
    // console.log(currentUser);
    setLoading(true);

    if (currentUser || isSignedIn) {
      try {
        cookcycleApiCall("post", "user/getfavoritesbyusername", {
          username: currentUser.email,
        })
          .then((response) => {
            if (response.data) {
              let userRecipes = [];

              response.data.forEach((result) => {
                cookcycleApiCall("get", `recipe/getbyid/${result.recipeId}`)
                  .then((response) => {
                    userRecipes.push({
                      recipeId: result.recipeId,
                      numOfMissingIngredients: 0,
                      recipe: response.data,
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              });

              setSavedRecipes(userRecipes);
              updateSavedRecipeField(response.data.length);
              setRecipesUpdated(false);
              setLoading(false);
            }
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }, [currentUser, isSignedIn, recipesUpdated]);

  useEffect(() => {
    if (isSignedIn && currentUser) {
      if (!userData) {
        Axios.post("/user/data", { email: currentUser.email })
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              setUserData(response.data);
            } else {
              console.error(
                `Error ${response.status}
                }`
              );
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [isSignedIn, currentUser, userData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        profileFields,
        selectProfileField,
        savedRecipes,
        showRecipeFocus,
        hideRecipeFocus,
        recipeFocusVisible,
        selectedRecipe,
        setSelectedRecipe,
        setRecipesUpdated,
        loading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
