import React from "react";

export function IngredientLine(props) {
    let ingredient = props.item;

    let line = ingredient.name;
    let amount = ingredient.amount;

    if (amount != null) {
        switch (amount.type) {
            case "weight":
                line = `${amount.value} ${amount.unit} ${line}`;
                break;
            case "volume":
                line = `${amount.value} ${amount.unit} ${line}`;
                break;
            case "items":
                line = `${amount.value} ${line}`;
                break;
            default:
                line = `Unknown -> ${JSON.stringify(amount)}`;
        }
    }

    return <div>{line}</div>;
}
