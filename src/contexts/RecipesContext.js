import React, { Component } from "react";

export const RecipesContext = React.createContext();

class ReciepsContextProvider extends Component {
  state = {
    ingredientSearchInput: "",
    ingredientSuggestions: [],
    selectedIngredients: [],
    autocompleteResultLimit: 5,
    recipeSearchResults: [],
    cursor: -1,
  };

  addIngredient = (ingredient) => {
    let { selectedIngredients } = this.state;

    selectedIngredients.push(ingredient);

    this.setState({
      selectedIngredients,
    });
  };

  removeIngredient = (event) => {
    const { selectedIngredients } = this.state;

    const ingredientToRemove = event.target.name;

    const newIngredients = selectedIngredients.filter((ingredient) => {
      // if (ingredient !== ingredientToRemove) {
      //   return ingredient;
      return ingredient !== ingredientToRemove;
    });

    this.setState({
      selectedIngredients: newIngredients,
    });
  };

  ingredientSearch = (inputString) => {
    if (inputString.length > 0) {
      const ingredients = require("../data/ingredients.json");

      const suggestions = ingredients.filter((ingredient) => {
        return ingredient.includes(inputString);
      });

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
          if (selectedIngredients[i] === suggestion) {
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
              value={suggestion}
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
              {suggestion}
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
        // Down arro
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

      this.addIngredient(suggestion);
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
        }}
      >
        {this.props.children}
      </RecipesContext.Provider>
    );
  }
}

export default ReciepsContextProvider;
