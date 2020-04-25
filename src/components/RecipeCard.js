import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import carbonara from "../images/Spaghetti-Carbonara-6.jpg";

const RecipeCard = (props) => {
  return (
    <div className="recipe-card">
      <FontAwesomeIcon className="save-recipe-icon" icon={faHeart} />
      <img src={carbonara} alt="" className="recipe-card-img" />
      <div className="recipe-card-detail-container">
        <div className="recipe-card-details">
          <p className="recipe-card-title">Spaghetti Carbonara</p>
          <p className="recipe-card-total-time">30 mins</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
