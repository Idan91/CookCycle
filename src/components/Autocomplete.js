import React from "react";
import { RecipesContext } from "../context/RecipesContext";

const Autocomplete = () => {
  return (
    <RecipesContext.Consumer>
      {(recipesContext) => {
        return (
          <div className="autocomplete">
            <div className="suggestions">
              <ul>
                {recipesContext.populateSuggestions()}
                {recipesContext.ingredientSuggestions.length >
                  recipesContext.autocompleteResultLimit && (
                  <li className="more-results">
                    Continue typing for more results...
                  </li>
                )}
              </ul>
            </div>
          </div>
        );
      }}
    </RecipesContext.Consumer>
  );
};

export default Autocomplete;
