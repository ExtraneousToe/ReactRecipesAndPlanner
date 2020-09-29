import React from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { RecipeList } from "./Recipes/RecipeList";

export function Recipes(props) {
    return (
        <div>
            <ul className="navbar-nav flex-grow">
                <NavItem>
                    <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/recipecreator"
                    >
                        Create a Recipe
                    </NavLink>
                </NavItem>
            </ul>
            <RecipeList
                list={props.recipeList}
                onRemoveRecipe={props.onRemoveRecipe}
            />
        </div>
    );
}
