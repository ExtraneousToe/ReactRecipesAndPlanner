import React from "react";

export function RecipeListItem(props) {
    let item = props.item;

    return (
        <div>
            <button onClick={(e) => props.onRemoveRecipe(props.index)}>
                -
            </button>
            <span onClick={(e) => props.onViewRecipe(item)}>
                {item.title} - {item.rating}
            </span>
        </div>
    );
}
