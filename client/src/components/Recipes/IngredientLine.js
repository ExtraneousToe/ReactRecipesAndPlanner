import React from "react";

export function IngredientLine(props) {
    let ingredient = props.item;

    let line = ingredient.name;

    if (
        ingredient.notes !== undefined &&
        ingredient.notes !== null &&
        ingredient.notes.length > 0
    ) {
        line = `${line} (${ingredient.notes})`;
    }
    return <li>{line}</li>;
}
