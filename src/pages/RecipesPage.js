import React, { useContext } from "react";
import IngredientButton from "../components/recipes/IngredientButton";
import RecipeCard from "../components/recipes/RecipeCard";
import { RecipesContext } from "../contexts/RecipesContext";
import IngredientSearch from "../components/recipes/IngredientSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const RecipesPage = () => {
  const { selectedIngredients, recipeSearchResults } = useContext(
    RecipesContext
  );

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

  const drawSearchedRecipes = () => {
    const recipes = recipeSearchResults.map((recipe) => {
      return <RecipeCard />;
    });

    return recipes;
  };

  return (
    <div className="page">
      <div className="content-container grid recipes-page-content">
        <div className="grid-item ingerdients">
          <div className="ingredient-container">
            <h2 className="page-subheader">Ingredients</h2>
            <IngredientSearch />
            {selectedIngredients.length > 0 && (
              <button className="btn btn-recipe-search">
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
            {drawSearchedRecipes()}
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
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
};

export default RecipesPage;
