import React, { useState, useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faStopwatch,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { RecipesContext } from "../../contexts/RecipesContext";
import { AuthContext } from "../../contexts/AuthContext";

const RecipeCard = (props) => {
  const [saved, setSaved] = useState(props.saved);
  const { selectRecipe, toggleSaveRecipe } = useContext(RecipesContext);

  const { currentUser } = useContext(AuthContext);
  const cardTitleRef = useRef(null);

  useEffect(() => {
    setSaved(props.saved);
  }, [props.saved]);

  const { recipe, recipeId, numOfMissingIngredients } = props.recipe;

  const getTotalTime = () => {
    const parsedCookTime = parseInt(recipe.cookTime.split(" ")[0]);
    const parsedPrepTime = parseInt(recipe.prepTime.split(" ")[0]);

    const cookTime = isNaN(parsedCookTime) ? 0 : parsedCookTime;
    const prepTime = isNaN(parsedPrepTime) ? 0 : parsedPrepTime;

    return cookTime + prepTime;
  };

  return (
    <div
      className="recipe-card card-appearance"
      recipeid={recipeId}
      onClick={(event) =>
        selectRecipe(
          event,
          props.recipeList,
          props.selectCallback,
          props.selectionSetter
        )
      }
    >
      <div
        className="save-recipe"
        onClick={() => toggleSaveRecipe(recipeId, currentUser, saved, setSaved)}
      >
        <FontAwesomeIcon
          className="save-recipe-icon"
          icon={saved ? faHeartSolid : faHeart}
        />
      </div>
      {/* <img src={carbonara} alt="" className="recipe-card-img" /> */}
      <img src={recipe.img_url} alt="" className="recipe-card-img" />
      <div className="recipe-card-detail-container">
        <div className="recipe-card-details">
          <div ref={cardTitleRef} className="recipe-card-title">
            <p>{recipe.name}</p>
          </div>
          {!props.page.toLowerCase().includes("user") && (
            <React.Fragment>
              <p className="recipe-bottom-item recipe-card-missing-ingredients">
                {numOfMissingIngredients}
                &nbsp;missing ingredient{numOfMissingIngredients !== 1 && "s"}
              </p>
            </React.Fragment>
          )}
          <div className="recipe-detials-bottom-row">
            <p className="recipe-bottom-item recipe-card-difficulty">
              <FontAwesomeIcon
                className="recipe-details-icon"
                icon={faBalanceScale}
              />{" "}
              &nbsp;
              {recipe.difficulty.trim()}
            </p>
            <p className="recipe-bottom-item recipe-card-total-time">
              <FontAwesomeIcon
                className="recipe-details-icon"
                icon={faStopwatch}
              />{" "}
              &nbsp;
              {/* {getTotalTime()}&nbsp;mins */}
              {getTotalTime() > 0 ? (
                <span>{getTotalTime()}&nbsp;mins</span>
              ) : (
                <span>N/A</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
