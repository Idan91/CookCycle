import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import IngredientButton from "../components/IngredientButton";
import RecipeCard from "../components/RecipeCard";
import ReciepsContextProvider, {
  RecipesContext,
} from "../context/RecipesContext";
import Autocomplete from "../components/Autocomplete";

const RecipesPage = () => {
  return (
    <ReciepsContextProvider>
      <RecipesContext.Consumer>
        {(recipesContext) => {
          const ingredient = (name) => {
            return (
              <li>
                <IngredientButton ingredient={name} />
              </li>
            );
          };

          return (
            <div className="page">
              {/* <h1 className="page-title">Recipes</h1> */}
              <div className="content-container grid recipes-page-content">
                <div className="grid-item ingerdients">
                  <div className="ingredient-container">
                    <h2 className="page-subheader">Ingredients</h2>
                    <div className="search-bar">
                      <label
                        className="search-label"
                        htmlFor="search-ingredient"
                      >
                        <input
                          type="text"
                          id="search-ingredient"
                          placeholder="Search ingredient..."
                          value={recipesContext.ingredientSearchInput}
                          onChange={recipesContext.handleInputChange}
                          autoComplete="off"
                        />
                        <FontAwesomeIcon
                          className="search-icon"
                          icon={faSearch}
                        />
                      </label>
                      {recipesContext.ingredientSuggestions.length > 0 && (
                        <Autocomplete />
                      )}
                    </div>
                    <ul className="active-ingredients">
                      {ingredient("Eggs")}
                      {ingredient("Bacon")}
                    </ul>
                  </div>
                </div>
                <div className="grid-item recipes">
                  {/* <h2 className="page-subheader">Recipes</h2> */}
                  <div className="card-container">
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </RecipesContext.Consumer>
    </ReciepsContextProvider>
  );
};

export default RecipesPage;
