import React, { Component } from "react";
import { Recipe } from "../dataTypes/Recipe";
import { withRouter } from "react-router";

class RecipeCreator extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChanged(event, field) {
        let partialState = {};
        let tempValue = event.target.value;

        switch (field) {
            case "title":
                break;
            case "rating":
                tempValue = Math.max(0, Math.min(5, tempValue));
                break;
        }

        partialState[field] = tempValue;

        this.setState(partialState);
    }

    handleSubmit(event) {
        let newRecipe = new Recipe(this.state.title);

        this.props.onRecipeCreated(newRecipe);

        this.setState({
            title: "",
            rating: 0,
        });

        event.preventDefault();
    }

    render() {
        return (
            <>
                <button onClick={() => this.props.history.goBack()}>
                    Back
                </button>
                <form className="py-3" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            value={this.state.title}
                            onChange={(e) => this.handleChanged(e, "title")}
                        />
                    </div>
                    <div>
                        <label>
                            Rating:
                            <input
                                type="number"
                                value={this.state.rating}
                                onChange={(e) =>
                                    this.handleChanged(e, "rating")
                                }
                            />
                        </label>
                    </div>
                    <input type="submit" value="submit" />
                </form>
            </>
        );
    }
}

export default withRouter(RecipeCreator);
