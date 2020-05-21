import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { RecipesContext } from "../../contexts/RecipesContext";

const IngredientButton = (props) => {
  const { removeIngredient } = useContext(RecipesContext);

  return (
    <button
      className="ingredient"
      name={props.ingredient}
      onClick={removeIngredient}
    >
      {props.ingredient}&ensp;
      <FontAwesomeIcon icon={faTimes} className="ingredient-x" />
    </button>
  );
};

export default IngredientButton;
