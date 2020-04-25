import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const IngredientButton = (props) => {
  return (
    <button className="ingredient">
      {props.ingredient}&ensp;
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
};

export default IngredientButton;
