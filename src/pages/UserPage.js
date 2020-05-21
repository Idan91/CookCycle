import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";

const UserPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

  const numOfRecipes = () => {
    let num = 0;

    if (userData) {
      num = userData.recipes.arrayValue.values.length;
    }

    return num === 0 ? "no" : num;
  };

  const displayName = currentUser ? currentUser.displayName : "";
  const photoURL = currentUser ? currentUser.photoURL : "";

  return (
    <div className="page">
      <div className="content-container">
        <div className="centered-container">
          <h2>{`Hi ${displayName}!`}</h2>
          <img src={photoURL} alt="profile pic" width="200px" />
          <h3>You have {numOfRecipes()} saved recipes</h3>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
