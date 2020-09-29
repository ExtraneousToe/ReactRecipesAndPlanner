import React, { Component } from "react";

export class RecipeCreator extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChanged(event, field) {
        let partialState = {};
        partialState[field] = event.target.value;

        this.setState(partialState);
    }

    handleSubmit(event) {
        let newRecipe = {
            title: this.state.title,
        };

        this.props.onRecipeCreated(newRecipe);

        this.setState({
            title: "",
        });

        event.preventDefault();
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={this.state.title}
                            onChange={(e) => this.handleChanged(e, "title")}
                        />
                    </label>
                    <input type="submit" value="submit" />
                </form>
            </>
        );
    }
}
