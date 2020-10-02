import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Recipes } from "./components/Recipes";
import ApiClient from "./ApiAccess";
import "./custom.css";

import { Recipe } from "./components/dataTypes/Recipe";

import testingRecipes from "./data/testingRecipes.json";

function getAllData(cb) {
    ApiClient.get("api/recipes", cb);
}

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
        // // stored items come out as a json string
        // let storedRecipes = localStorage.getItem("recipes");
        // // convert the string into an object (in this case an array of objects)
        // storedRecipes = JSON.parse(storedRecipes);

        // if (storedRecipes == null || !(storedRecipes instanceof Array)) {
        //     storedRecipes = [];
        // }

        // if (storedRecipes.length === 0) {
        //     testingRecipes.map((item, index) => {
        //         console.log(`Storing item ${index}: ${item.title}`);
        //         storedRecipes.push(Recipe.fromJsonObject(item));

        //         return null;
        //     });
        // }

        getAllData((recipes) => {
            // console.log(`recipes:`);
            // console.log(recipes);
            this.setState({
                recipes: recipes,
            });
        });

        // this.setState({
        //     recipes: storedRecipes,
        // });
    }

    handleRecipeCreated(recipe) {
        console.log(`Created item: ${recipe.title}`);

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
        let removingItem = this.state.recipes.filter(
            (item, idx) => removeAtIndex === idx
        );

        console.log(`Removed item at index: ${removeAtIndex}`);

        // localStorage.setItem("recipes", JSON.stringify(filterList));

        ApiClient.del(
            "api/recipes",
            {
                recipeId: removingItem[0].id,
            },
            () => {
                getAllData((recipes) => {
                    console.log(recipes);
                    this.setState({
                        recipes: recipes,
                    });
                });
            }
        );

        // this.setState({
        //     recipes: filterList,
        // });
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/recipes">
                        <Recipes
                            recipeList={this.state.recipes}
                            onRemoveRecipe={this.handleRemoveRecipe}
                            onCreateRecipe={this.handleRecipeCreated}
                        />
                    </Route>
                    <Route path="/planner">Meal Planner - NYI</Route>
                    <Route path="/settings">Settings - NYI</Route>
                </Switch>
            </Layout>
        );
    }
}
