import React, { Component } from "react";
import {
    Recipe,
    TimingBlock,
    ServesBlock,
    IngredientLine,
    StepGroup,
    NoteGroup,
} from "../dataTypes/Recipe";
import { withRouter } from "react-router";

class RecipeCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            rating: 0,
            tags: [],
            timing: new TimingBlock(0, 0),
            serves: new ServesBlock(0, 0),
            ingredients: [],
            steps: [],
            notes: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChanged(event, field) {
        let partialState = {};
        let tempValue = event.target.value;

        switch (field) {
            case "title":
                break;
            case "tagsString":
                break;
            case "rating":
                tempValue = Math.max(0, Math.min(5, tempValue));
                break;
            default:
                return;
        }

        partialState[field] = tempValue;

        this.setState(partialState);
    }

    handleSubmit(event) {
        let tagsList = this.state.tagsString.replace(/\s+/g, "").split(",");

        let newRecipe = new Recipe(
            this.state.title,
            this.state.rating,
            tagsList
        );

        this.props.onRecipeCreated(newRecipe);

        this.setState({
            title: "",
            rating: 0,
            tagsString: "",
        });

        event.preventDefault();
    }

    render() {
        return (
            <>
                <form className="py-3" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            value={this.state.title}
                            onChange={(e) => this.handleChanged(e, "title")}
                            required
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
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Tags:
                            <input
                                type="text"
                                value={this.state.tagsString}
                                onChange={(e) =>
                                    this.handleChanged(e, "tagsString")
                                }
                            />
                        </label>
                    </div>
                    <input type="submit" value="Create" />
                </form>
            </>
        );
    }
}

export default withRouter(RecipeCreator);
