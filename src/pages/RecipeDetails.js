import React, { useContext, useState, useEffect } from "react";
import Page from "./Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { RecipesContext } from "../contexts/RecipesContext";
import { AuthContext } from "../contexts/AuthContext";
import { cookcycleApiCall } from "../util/fetch";

const RecipeDetails = ({ match }) => {
  const { toggleSaveRecipe } = useContext(RecipesContext);
  const { currentUser } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      cookcycleApiCall("get", `recipe/getbyid/${match.params.id}`)
        .then((response) => {
          const currentRecipe = response.data;
          setRecipe(currentRecipe);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchRecipe();
  }, [match.params.id]);

  useEffect(() => {
    const setRecipeSaveState = async () => {
      if (currentUser) {
        cookcycleApiCall("post", "user/getfavoritesbyusername", {
          username: currentUser.email,
        })
          .then((response) => {
            if (response.data) {
              let saveStatus = false;
              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].recipeId === parseInt(match.params.id)) {
                  saveStatus = true;
                  break;
                }
              }
              setSaved(saveStatus);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };

    setRecipeSaveState();
  }, [recipe, currentUser, match.params.id]);

  const drawIngredients = () => {
    let ingredientsListItems = [];

    recipe.ingredientsInRecipe.forEach((ingredient, index) => {
      ingredientsListItems.push(<li key={index}>{ingredient.string}</li>);
    });

    return (
      <ul className="recipe-focus-ingredient-list">{ingredientsListItems}</ul>
    );
  };

  const drawRecipeDetials = () => {
    const details = [
      {
        name: "servings",
        label: "Servings",
      },
      {
        name: "prepTime",
        label: "Prep time",
      },
      {
        name: "cookTime",
        label: "Cook time",
      },
      {
        name: "difficulty",
        label: "Difficulty",
      },
    ];

    let detailListItems = [];

    details.forEach((detail, index) => {
      if (recipe[detail.name] && recipe[detail.name].trim() !== "") {
        let { label } = detail;
        let value = detail.value || recipe[detail.name];

        if (detail.name === "servings") {
          detailListItems.push(<li key={label}>{value}</li>);
        } else {
          detailListItems.push(
            <li key={label}>
              {label}:&ensp;{value}
            </li>
          );
        }
        if (index < details.length - 1) {
          if (window.innerWidth > 800) {
            detailListItems.push(<li key={index}>|</li>);
          } else {
            detailListItems.push(<br key={index} />);
          }
        }
      }
    });

    return <ul>{detailListItems}</ul>;
  };

  const displayRecipeInstructions = () => {
    const instructionLines = recipe.method.split(". ");
    let instructions = [];

    instructionLines.forEach((line, index) => {
      if (line.trim() !== "" && line.trim() !== ".") {
        let period = ".";

        if (index === instructionLines.length - 1) {
          period = "";
        }

        instructions.push(
          <li key={index}>
            <p>{`${line.trim()}${period}`}</p>
          </li>
        );
      }
    });

    return <ul className="recipe-instructions">{instructions}</ul>;
  };

  return (
    <Page>
      {recipe && (
        <>
          {saved !== null && (
            <div
              className="save-recipe save-recipe-focus"
              onClick={() =>
                toggleSaveRecipe(recipe.id, currentUser, saved, setSaved)
              }
            >
              <FontAwesomeIcon
                className="save-recipe-icon"
                icon={saved ? faHeartSolid : faHeart}
              />
            </div>
          )}
          <div className="recipe-focus-container">
            <h1>{recipe.name}</h1>
            {recipe.author && (
              <h4 className="recipe-author">Author:&ensp;{recipe.author}</h4>
            )}
            <img
              src={recipe.img_url}
              className="recipe-focus-img"
              alt={recipe.name}
            />
            <br />
            <div className="recipe-focus-details">{drawRecipeDetials()}</div>
            <br />
            <h3>Ingredients</h3>
            <div className="recipe-focus-section-container">
              {drawIngredients()}
            </div>
            <br />
            <h3>Instructions</h3>
            <div className="recipe-focus-section-container">
              {displayRecipeInstructions()}
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

export default RecipeDetails;
