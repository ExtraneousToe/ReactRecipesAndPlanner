import React from "react";

export function StepsGroup(props) {
    let stepGroup = props.item;

    let innerSteps = stepGroup.steps.map((item, index) => {
        return <li key={item.idx}>{item.step}</li>;
    });

    return (
        <li>
            <div>
                <b>{props.item.heading}</b>
            </div>
            <ol>{innerSteps}</ol>
        </li>
    );
}
