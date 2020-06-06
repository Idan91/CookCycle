import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { RecipesContext } from "../../contexts/RecipesContext";
import Autocomplete from "../Autocomplete";

const IngredientSearch = () => {
  const {
    ingredientSearchInput,
    ingredientSuggestions,
    handleInputChange,
    handleKeyDown,
  } = useContext(RecipesContext);

  return (
    <div className="search-bar">
      <label className="search-label" htmlFor="search-ingredient">
        <input
          type="text"
          id="search-ingredient"
          placeholder="Search ingredients..."
          autoComplete="off"
          value={ingredientSearchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
      </label>
      {ingredientSuggestions.length > 0 && <Autocomplete />}
    </div>
  );
};

export default IngredientSearch;
