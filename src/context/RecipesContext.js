import React, { Component } from "react";

export const RecipesContext = React.createContext();

class ReciepsContextProvider extends Component {
  state = {
    ingredientSearchInput: "",
    ingredientSuggestions: [],
    ingredients: [],
    autocompleteResultLimit: 5,
    recipeSearchResults: [],
    cursor: -1,
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

    console.log(value);

    if (value === "") {
      this.setState({
        ingredientSuggestions: [],
      });
    } else {
      this.ingredientSearch(value);
    }
  };

  populateSuggestions = () => {
    const { ingredientSuggestions } = this.state;

    let suggestions = [];

    ingredientSuggestions.forEach((suggestion, index) => {
      if (index < this.state.autocompleteResultLimit) {
        suggestions.push(
          <li
            className="suggestion"
            key={index}
            value={suggestion}
            onClick={this.selectSuggestion}
          >
            {suggestion}
          </li>
        );
      }
    });

    return suggestions;
  };

  render() {
    return (
      <RecipesContext.Provider
        value={{
          ...this.state,
          handleInputChange: this.handleInputChange,
          populateSuggestions: this.populateSuggestions,
        }}
      >
        {this.props.children}
      </RecipesContext.Provider>
    );
  }
}

export default ReciepsContextProvider;
