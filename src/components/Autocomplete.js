import React, { useContext } from "react";
import { RecipesContext } from "../contexts/RecipesContext";

const Autocomplete = () => {
  const {
    populateSuggestions,
    ingredientSuggestions,
    autocompleteResultLimit,
  } = useContext(RecipesContext);

  return (
    <div className="autocomplete">
      <div className="suggestions">
        <ul>
          {populateSuggestions()}
          {ingredientSuggestions.length > autocompleteResultLimit && (
            <li className="more-results">
              Continue typing for more results...
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
