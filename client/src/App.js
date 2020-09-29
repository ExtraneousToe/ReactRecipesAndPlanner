import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Recipes } from "./components/Recipes";
import { RecipeCreator } from "./components/Recipes/RecipeCreator";
// import ApiClient from "./ApiAccess";
import "./custom.css";

import { Recipe } from "./components/dataTypes/Recipe";

import testingRecipes from "./data/testingRecipes.json";

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
        };

        this.handleRecipeCreated = this.handleRecipeCreated.bind(this);
        this.handleRemoveRecipe = this.handleRemoveRecipe.bind(this);
    }

    componentDidMount() {
        let storedRecipes = localStorage.getItem("recipes");
        console.log(
            `storedRecipes -> ${typeof storedRecipes} -> ${storedRecipes}`
        );

        if (storedRecipes instanceof String) {
            storedRecipes = JSON.parse(storedRecipes);

            console.log(
                `storedRecipes -> ${typeof storedRecipes} -> ${storedRecipes}`
            );
        }

        if (storedRecipes == null || !(storedRecipes instanceof Array)) {
            storedRecipes = [];
        }

        if (storedRecipes.length === 0) {
            testingRecipes.map((item, index) => {
                storedRecipes.push(Recipe.fromJsonObject(item));

                return null;
            });
        }

        this.setState({
            recipes: storedRecipes,
        });
    }

    handleRecipeCreated(recipe) {
        let copiedList = this.state.recipes.slice();
        copiedList.push(recipe);

        localStorage.setItem("recipes", JSON.stringify(copiedList));

        this.setState({
            recipes: copiedList,
        });
    }

    handleRemoveRecipe(removeAtIndex) {
        let filterList = this.state.recipes.filter(
            (item, idx) => removeAtIndex !== idx
        );

        this.setState({
            recipes: filterList,
        });
    }

    render() {
        return (
            <Layout>
                <Route exact path="/" component={Home} />
                <Route path="/recipes">
                    <Recipes
                        recipeList={this.state.recipes}
                        onRemoveRecipe={this.handleRemoveRecipe}
                    />
                </Route>
                <Route path="/recipecreator">
                    <RecipeCreator onRecipeCreated={this.handleRecipeCreated} />
                </Route>
            </Layout>
        );
    }
}
