import React, { Component } from "react";

export class Home extends Component {
    static displayName = Home.name;
    render() {
        return (
            <div>
                <p>Welcome to the Recipe &amp; Meal Planner.</p>
                <p>
                    Eventually you will be able to compile a list of your
                    favourite recipes and classify them in various ways.
                </p>
            </div>
        );
    }
}
