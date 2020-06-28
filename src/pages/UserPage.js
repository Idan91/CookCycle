import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import { RecipesContext } from "../contexts/RecipesContext";
import Page from "./Page";
import { loader } from "../util/uiUtils";

const UserPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { drawSearchedRecipes } = useContext(RecipesContext);
  const {
    profileFields,
    selectProfileField,
    savedRecipes,
    loading,
  } = useContext(UserContext);

  const displayName = currentUser ? currentUser.displayName : "";
  const photoURL = currentUser ? currentUser.photoURL : "";

  const populateProfileFields = () => {
    let profileFieldElements = [];

    profileFields.forEach((field) => {
      let value = "";

      switch (typeof field.value) {
        case "Array": {
          value = field.value.length;
          break;
        }
        case "object": {
          value = Object.keys(field.value).length;
          break;
        }
        default: {
          value = field.value;
        }
      }

      profileFieldElements.push(
        <li
          className={`profile-field ${
            field.active ? "active-profile-field" : ""
          }`}
          onClick={selectProfileField}
          key={field.name}
          name={field.name}
        >
          <p className="profile-field-value">{value}</p>
          <br />
          <p className="profile-field-name">{field.name}</p>
        </li>
      );
    });

    return <ul className="profile-fields">{profileFieldElements}</ul>;
  };

  const savedRecipesContent = () => {
    let content = "";

    content = drawSearchedRecipes(savedRecipes, "UserPage");
    return <React.Fragment>{content}</React.Fragment>;
  };

  const renderProfileContent = () => {
    let activeField = "";

    for (let i = 0; i < profileFields.length; i++) {
      if (profileFields[i].active) {
        activeField = profileFields[i].name;
        break;
      }
    }

    let content = "";

    switch (activeField) {
      case "Saved Recipes": {
        content = savedRecipesContent();
        break;
      }
      default: {
        break;
      }
    }

    return <div className="profile-content">{content}</div>;
  };

  const profileBar = useRef(null);

  useEffect(() => {
    if (profileBar) {
      if (profileBar.fireEvent) {
        profileBar.fireEvent("onclick");
      } else {
        const evObj = document.createEvent("Events");
        evObj.initEvent("click", true, false);
        setTimeout(() => {
          if (profileBar.dispathEvent) {
            profileBar.dispathEvent(evObj);
          }
        }, 300);
      }
    }
  }, []);

  return (
    <Page>
      <React.Fragment>
        {loading ? (
          loader
        ) : (
          <React.Fragment>
            <img
              src={photoURL}
              alt="profile pic"
              width="125px"
              className="profile-pic"
            />
            <br />
            <h2>{`${displayName}`}</h2>
            <div ref={profileBar} className="user-profile-bar">
              {populateProfileFields()}
            </div>
            {renderProfileContent()}
          </React.Fragment>
        )}
      </React.Fragment>
    </Page>
  );
};

export default UserPage;
