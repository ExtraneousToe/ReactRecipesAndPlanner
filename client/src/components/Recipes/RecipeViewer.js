import React from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { IngredientLine } from "./IngredientLine";
import { NotesGroup } from "./NotesGroup";
import { StepsGroup } from "./StepsGroup";
import { TagLine } from "./TagLine";

export function RecipeViewer(props) {
    let match = useRouteMatch();
    let failAndRedirect = false;
    let searching = [];
    let items = [];
    let soughtName = match.params.name;
    soughtName = soughtName.replace(/\s+/g, "");

    if (soughtName.length == 0) {
        failAndRedirect = true;
        return (
            <span>
                <code>soughtName.length == {soughtName.length}</code>
            </span>
        );
    }

    if (props.list.length == 0) {
        failAndRedirect = true;
        return (
            <span>
                <code>props.list.length == {props.list.length}</code>
            </span>
        );
    }

    items = props.list.filter((item, index) => {
        let squashedName = item.title.replace(/\s+/g, "");
        searching.push(squashedName);
        return squashedName == soughtName;
    });

    let recipeItem = items[0];

    if (recipeItem == null) {
        failAndRedirect = true;
        return (
            <span>
                No recipeItem from{" "}
                {searching.map((item, idx) => {
                    return <span key={idx}>{item}</span>;
                })}
            </span>
        );
    }

    if (failAndRedirect) {
        return <Redirect to="/recipes/list/" />;
    }

    // let output = null;
    // output = Object.keys(recipeItem).map((key) => {
    //     return <div key={key.title}>{JSON.stringify(key)}</div>;
    // });

    let tagsOutput = recipeItem.tags.join(", ");
    // .map((item, index) => {
    //     return <TagLine item={item} key={index} />;
    // })
    // .join(", ");

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
            <div>
                {/* {output} */}

                <h3>{recipeItem.title}</h3>
                <div>
                    <b>Rating:</b> {recipeItem.rating}
                </div>
                <div>
                    <b>Tags:</b> {tagsOutput}
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
