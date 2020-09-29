import React from "react";
import { RecipeListItem } from "./RecipeListItem";

export function RecipeList(props) {
    if (props.list === null || !(props.list instanceof Array)) {
        return (
            <div>
                Error: {typeof props.list}-{JSON.stringify(props.list)}
            </div>
        );
    }

    let listContent = props.list.map((recipe, index) => (
        <RecipeListItem
            key={recipe.title}
            item={recipe}
            index={index}
            onRemoveRecipe={props.onRemoveRecipe}
            onViewRecipe={props.onViewRecipe}
        />
    ));

    return <div>{listContent}</div>;
}
