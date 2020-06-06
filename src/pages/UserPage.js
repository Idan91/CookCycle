import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";

const UserPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { userData, profileFields, selectProfileField } = useContext(
    UserContext
  );

  const numOfRecipes = () => {
    let num = 0;

    if (userData) {
      num = userData.recipes.arrayValue.values.length;
    }

    return num === 0 ? "no" : num;
  };

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

  const savedRecipesContent = (
    <React.Fragment>
      <h4>You have {numOfRecipes()} saved recipes</h4>
    </React.Fragment>
  );

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
        content = savedRecipesContent;
        break;
      }
      default: {
        break;
      }
    }

    return <div className="profile-content">{content}</div>;
  };

  return (
    <div className="page">
      <div className="content-container">
        <div className="centered-container">
          <img
            src={photoURL}
            alt="profile pic"
            width="125px"
            className="profile-pic"
          />
          <h1>{`${displayName}`}</h1>
          <div className="user-profile-bar">{populateProfileFields()}</div>
          {/* <h3>You have {numOfRecipes()} saved recipes</h3> */}
          {/* <div className="profile-content">{saveRecipesContent}</div> */}
          {renderProfileContent()}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
