import React, { Component } from "react";
import { cookcycleApiCall } from "../util/fetch";
import { UserContext } from "../contexts/UserContext";
import PrivateRoute from "../components/PrivateRoute";
import RecipeCard from "../components/recipes/RecipeCard";
import RecipeDetails from "../pages/RecipeDetails";

export const RecipesContext = React.createContext();

class ReciepsContextProvider extends Component {
  state = {
    ingredientSearchInput: "",
    ingredientSuggestions: [],
    selectedIngredients: [],
    autocompleteResultLimit: 5,
    recipeSearchResults: [],
    cursor: -1,
    recipeFocusVisible: false,
    selectedRecipe: "",
    loading: false,
    searchInitialized: false,
    recipeRoutes: [],
  };

  static contextType = UserContext;

  addIngredient = (ingredient) => {
    let { selectedIngredients } = this.state;

    selectedIngredients.push(ingredient);

    this.setState({
      selectedIngredients,
    });
  };

  searchRecipes = () => {
    const { selectedIngredients } = this.state;

    this.setState({
      recipeSearchResults: [],
      loading: true,
      searchInitialized: true,
    });

    cookcycleApiCall("post", "recipe/getavailablerecipes", selectedIngredients)
      .then((response) => {
        if (response.data) {
          this.setState({
            recipeSearchResults: response.data,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          loading: false,
        });
      });
  };

  removeIngredient = (event) => {
    const { selectedIngredients } = this.state;

    const ingredientToRemove = event.target.name;

    const newIngredients = selectedIngredients.filter((ingredient) => {
      return ingredient !== ingredientToRemove;
    });

    this.setState({
      selectedIngredients: newIngredients,
    });
  };

  ingredientSearch = (inputString) => {
    if (inputString.length > 0) {
      const ingredients = require("../data/ingredientList.json");

      inputString = inputString.toLowerCase();

      let suggestions = ingredients.filter((ingredient) => {
        return ingredient.name.includes(inputString);
      });

      suggestions = this.sortIngredientsInputFirst(inputString, suggestions);

      if (suggestions.length === 0) {
        this.setState({
          ingredientSuggestions: [],
        });
      } else {
        this.setState({
          ingredientSuggestions: suggestions,
        });
      }
    }
  };

  sortIngredientsInputFirst = (input, data) => {
    var first = [];
    var others = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].name.indexOf(input) === 0) {
        first.push(data[i]);
      } else {
        others.push(data[i]);
      }
    }
    first.sort();
    others.sort();
    return first.concat(others);
  };

  handleInputChange = (event) => {
    const { value } = event.target;

    this.setState({
      ingredientSearchInput: value,
      cursor: -1,
    });

    if (value === "") {
      this.setState({
        ingredientSuggestions: [],
      });
    } else {
      this.ingredientSearch(value);
    }
  };

  populateSuggestions = () => {
    const { ingredientSuggestions, cursor, selectedIngredients } = this.state;

    let suggestions = [];

    let ingredientCount = 0;
    ingredientSuggestions.forEach((suggestion, index) => {
      if (ingredientCount < this.state.autocompleteResultLimit) {
        let selected = false;
        for (let i = 0; i < selectedIngredients.length; i++) {
          if (selectedIngredients[i] === suggestion.name) {
            selected = true;
            break;
          }
        }

        if (!selected) {
          suggestions.push(
            <li
              className={`suggestion ${
                cursor === index ? "suggetion-active" : ""
              }`}
              key={index}
              value={suggestion.name}
              onClick={this.selectSuggestion}
              onMouseOver={(event) => {
                event.target.classList.add("suggetion-active");
                if (cursor > -1) {
                  this.setState({
                    cursor: -1,
                  });
                }
              }}
              onMouseLeave={(event) => {
                event.target.classList.remove("suggetion-active");
              }}
            >
              {suggestion.name}
            </li>
          );
          ingredientCount++;
        }
      }
    });

    return suggestions;
  };

  handleKeyDown = (event) => {
    const { cursor, ingredientSuggestions } = this.state;
    const { keyCode } = event;

    switch (keyCode) {
      case 38: {
        event.preventDefault();
        // Up arrow
        if (cursor > 0) {
          this.setState((prevState) => ({
            cursor: prevState.cursor - 1,
          }));
        }
        break;
      }
      case 40: {
        // Down arrow
        const limit =
          Math.min(
            this.state.autocompleteResultLimit,
            ingredientSuggestions.length
          ) - 1;
        if (cursor < limit) {
          this.setState((prevState) => ({
            cursor: prevState.cursor + 1,
          }));
        }
        break;
      }
      case 13:
      // Enter/Return
      /* falls through */
      case 9: {
        // Tab
        if (ingredientSuggestions.length > 0) {
          event.preventDefault();
          if (keyCode === 9 && cursor === -1) {
            this.setState((prevState) => ({
              cursor: prevState.cursor + 1,
            }));
          } else {
            this.selectSuggestion(event);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  selectSuggestion = (event) => {
    if (event.keyCode === 13 || event.keyCode === 9) {
      this.keyboardPressSuggestionSelection();
    } else {
      this.mouseClickSuggestionSelection(event);
    }

    this.setState((prevState) => ({
      cursor: -1,
      ingredientSearchInput: "",
      ingredientSuggestions: [],
    }));
  };

  keyboardPressSuggestionSelection = () => {
    const { cursor } = this.state;
    let suggestion;

    try {
      suggestion = this.state.ingredientSuggestions[cursor];

      this.addIngredient(suggestion.name);
    } catch (err) {
      console.error(err);
    }
  };

  mouseClickSuggestionSelection = (event) => {
    const ingredient = event.target.getAttribute("value");

    try {
      this.addIngredient(ingredient);
    } catch (err) {
      console.error(err);
    }
  };

  onRecipeSelection = (event) => {
    let { target } = event;

    try {
      while (
        !target.classList.value.includes("recipe-card ") &&
        target.classList.value !== "save-recipe"
      ) {
        target = target.parentNode;
      }
    } catch (err) {
      console.error(err);
    }
  };

  addRecipeToFavorites = async (recipeId, userEmail) => {
    const requestData = { username: userEmail, recipeId: recipeId };

    return new Promise((resolve, reject) => {
      try {
        cookcycleApiCall("post", "favorite/add", requestData)
          .then((result) => {
            this.context.setRecipesUpdated(true);
            resolve(result);
          })
          .catch((err) => {
            console.error(err);
            reject("Error adding recipe to favorites");
          });
      } catch (err) {
        reject("Error adding recipe to favorites");
      }
    });
  };

  removeRecipeFromFavorites = async (recipeId, userEmail) => {
    const requestData = { user: userEmail, recipeId: recipeId };

    return new Promise((resolve, reject) => {
      try {
        cookcycleApiCall("post", "favorite/delete", requestData)
          .then((result) => {
            console.log(result);
            this.context.setRecipesUpdated(true);
            resolve(result);
          })
          .catch((err) => {
            console.error(err);
            reject("Error removing recipe from favorites");
          });
      } catch (err) {
        console.error(err);
        reject("Error removing recipe from favorites");
      }
    });
  };

  drawSearchedRecipes = (recipeList, page = "") => {
    const { savedRecipes } = this.context;

    const recipes = recipeList.map((recipe, index) => {
      let isSaved = false;

      savedRecipes.forEach((saved) => {
        if (saved.recipeId === recipe.recipeId) {
          isSaved = true;
        }
      });

      return (
        <RecipeCard key={index} recipe={recipe} saved={isSaved} page={page} />
      );
    });

    if (recipes.length > 0) {
      return recipes;
    } else {
      if (this.state.searchInitialized) {
        return <p className="no-recipes-msg">No recipes found</p>;
      }
    }
  };

  toggleSaveRecipe = async (recipeId, currentUser, isSaved, saveMethod) => {
    if (!isSaved) {
      saveMethod(true);

      await this.addRecipeToFavorites(recipeId, currentUser.email)
        .then((response) => {
          console.log(response);

          if (
            response.status >= 200 &&
            response.status < 300 &&
            response.data.id
          ) {
            // Do Nothing
          } else {
            saveMethod(false);
            window.alert("Error adding recipe to favorites");
          }
        })
        .catch((err) => {
          window.alert("Error adding recipe to favorites");
          console.error(err);
        });
    } else {
      saveMethod(false);

      await this.removeRecipeFromFavorites(recipeId, currentUser.email)
        .then((response) => {
          console.log(response);

          if (response.status >= 200 && response.status < 300) {
            // Do Nothing
          } else {
            saveMethod(true);
            window.alert("Error removing recipe to favorites");
          }
        })
        .catch((err) => {
          window.alert("Error removing recipe to favorites");
          console.error(err);
        });
    }
  };

  setRecipeRoutes = () => {
    const { savedRecipes } = this.context;
    const { recipeSearchResults } = this.state;

    let recipeRoutes = [];

    const addRecipeRoutesToArray = (recipeList) => {
      recipeList.forEach((recipe) => {
        recipeRoutes.push(
          <PrivateRoute
            key={recipe.recipe.name}
            path={`/recipe/:recipeId`}
            component={<RecipeDetails recipe={recipe} />}
          />
        );
      });
    };

    addRecipeRoutesToArray(savedRecipes);
    addRecipeRoutesToArray(recipeSearchResults);

    this.setState({
      recipeRoutes,
    });
  };

  clearSearchResults = () => {
    this.setState({
      recipeSearchResults: [],
      searchInitialized: false,
    });
  };

  render() {
    return (
      <RecipesContext.Provider
        value={{
          ...this.state,
          populateSuggestions: this.populateSuggestions,
          drawSearchedRecipes: this.drawSearchedRecipes,
          addIngredient: this.addIngredient,
          removeIngredient: this.removeIngredient,
          handleInputChange: this.handleInputChange,
          handleInputFocus: this.handleInputFocus,
          handleKeyDown: this.handleKeyDown,
          selectSuggestion: this.selectSuggestion,
          searchRecipes: this.searchRecipes,
          addRecipeToFavorites: this.addRecipeToFavorites,
          removeRecipeFromFavorites: this.removeRecipeFromFavorites,
          toggleSaveRecipe: this.toggleSaveRecipe,
          setRecipeRoutes: this.setRecipeRoutes,
          clearSearchResults: this.clearSearchResults,
        }}
      >
        {this.props.children}
      </RecipesContext.Provider>
    );
  }
}

export default ReciepsContextProvider;
