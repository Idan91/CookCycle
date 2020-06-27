import React, { useContext } from "react";
import IngredientButton from "../components/recipes/IngredientButton";
import { RecipesContext } from "../contexts/RecipesContext";
import IngredientSearch from "../components/recipes/IngredientSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Page from "./Page";
import { loader } from "../util/uiUtils";

const RecipesPage = () => {
  const {
    selectedIngredients,
    searchRecipes,
    drawSearchedRecipes,
    recipeSearchResults,
    loading,
    clearSearchResults,
  } = useContext(RecipesContext);

  const drawSelectedIngredients = () => {
    let ingredients = [];

    selectedIngredients.forEach((ingredient, index) => {
      ingredients.push(
        <li key={index}>
          <IngredientButton ingredient={ingredient} />
        </li>
      );
    });

    return <ul className="selected-ingredients">{ingredients}</ul>;
  };

  return (
    <React.Fragment>
      <Page>
        <div className="grid-item ingerdients">
          <div className="ingredient-container">
            <h2 className="page-subheader">Ingredients</h2>
            <IngredientSearch />
            {selectedIngredients.length > 0 && (
              <button className="btn btn-recipe-search" onClick={searchRecipes}>
                Search Recipes&ensp;
                <FontAwesomeIcon icon={faSearch} />
              </button>
            )}
            <br />
            {drawSelectedIngredients()}
          </div>
        </div>
        <div className="grid-item recipes">
          <div className="card-container">
            {loading ? (
              loader
            ) : (
              <>
                {recipeSearchResults.length > 0 && (
                  <React.Fragment>
                    {/* <hr /> */}
                    <br />
                    <button
                      className="btn btn-clear-results"
                      onClick={clearSearchResults}
                    >
                      Clear Results
                    </button>
                    <br />
                  </React.Fragment>
                )}
                {drawSearchedRecipes(recipeSearchResults, "RecipesPage")}
              </>
            )}
          </div>
        </div>
      </Page>
    </React.Fragment>
  );
};

export default RecipesPage;
