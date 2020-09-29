import React from "react";
import { IngredientLine } from "./IngredientLine";
import { NotesGroup } from "./NotesGroup";
import { StepsGroup } from "./StepsGroup";

export function RecipeViewer(props) {
    let recipeItem = props.item;

    let ingredientOutput = recipeItem.ingredients.map((item, index) => {
        return <IngredientLine item={item} key={index} />;
    });

    let stepsOutput = recipeItem.steps.map((item, index) => {
        return <StepsGroup key={index} item={item} />;
    });

    let noteOutput = recipeItem.notes.map((item, index) => {
        return <NotesGroup key={index} item={item} />;
    });

    return (
        <div>
            <button onClick={() => props.onBack()}>Back</button>
            <div>
                <h3>{recipeItem.title}</h3>
                <div>
                    <b>Rating:</b> {recipeItem.rating}
                </div>
                <div>
                    <b>Ingredients:</b> {ingredientOutput}
                </div>
                <div>
                    <b>Steps:</b>
                    <ul>{stepsOutput}</ul>
                </div>
                <div>
                    <b>Notes:</b>
                    <ul>{noteOutput}</ul>
                </div>
            </div>
        </div>
    );
}
