import React from "react";
import { RecipeListItem } from "./RecipeListItem";

export function RecipeList(props) {
    let listContent = props.list.map((recipe, index) => (
        <RecipeListItem
            key={recipe.title}
            item={recipe}
            index={index}
            onRemoveRecipe={props.onRemoveRecipe}
        />
    ));

    return <div>{listContent}</div>;
}
