import React from "react";
import { useHistory } from "react-router-dom";

export function RecipeListItem(props) {
    let history = useHistory();

    let item = props.item;

    return (
        <div>
            <button onClick={(e) => props.onRemoveRecipe(props.index)}>
                -
            </button>
            <span
                className="px-2"
                onClick={(e) => {
                    history.push(
                        `${props.routingUrl}/item/${item.title.replace(
                            /\s+/g,
                            ""
                        )}`
                    );
                    e.preventDefault();
                }}
            >
                {item.title} - {item.rating}
            </span>
        </div>
    );
}
