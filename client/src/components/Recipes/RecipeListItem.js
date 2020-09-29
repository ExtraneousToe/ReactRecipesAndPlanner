import React from "react";

export function RecipeListItem(props) {
    return (
        <div onClick={(e) => props.onRemoveRecipe(props.index)}>
            {props.item.title}
        </div>
    );
}
