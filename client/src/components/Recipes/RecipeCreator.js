import React, { Component } from "react";
import {
    Recipe,
    TimingBlock,
    ServesBlock,
    IngredientLine,
    StepGroup,
    NoteGroup,
} from "../dataTypes/Recipe";

function IngredientEditor(props) {
    let ingredientLine = props.item;

    return (
        <tr>
            <td>
                <button
                    onClick={(e) => {
                        props.onRemoveItem();
                        e.preventDefault();
                    }}
                >
                    x
                </button>
            </td>

            <td>
                <input
                    value={ingredientLine.name}
                    onChange={(e) => {
                        ingredientLine.name = e.target.value;
                        e.preventDefault();
                        props.onUpdateIngredient(ingredientLine);
                    }}
                    required
                />
            </td>
            <td>
                <input
                    value={ingredientLine.notes}
                    onChange={(e) => {
                        ingredientLine.notes = e.target.value;
                        e.preventDefault();
                        props.onUpdateIngredient(ingredientLine);
                    }}
                />
            </td>
        </tr>
    );
}

function StepEditor(props) {
    let stepGroup = props.item;

    return (
        <div>
            {" "}
            <button
                onClick={(e) => {
                    props.onRemoveItem();
                    e.preventDefault();
                }}
            >
                -
            </button>
            StepEditor :: {stepGroup.heading}
        </div>
    );
}

function NoteEditor(props) {
    let noteGroup = props.item;

    return (
        <div>
            <button
                onClick={(e) => {
                    props.onRemoveItem();
                    e.preventDefault();
                }}
            >
                -
            </button>
            NoteEditor :: {noteGroup.heading}
        </div>
    );
}

export default class RecipeCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            rating: 1,
            tagsString: "",
            prepTime: 0,
            cookTime: 0,
            minServes: 0,
            maxServes: 0,
            ingredients: [],
            steps: [],
            notes: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChanged = this.handleChanged.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.removeStep = this.removeStep.bind(this);
        this.removeNote = this.removeNote.bind(this);

        this.updateIngredientLine = this.updateIngredientLine.bind(this);
    }

    handleChanged(event, field, inputType) {
        let partialState = {};
        let tempValue = event.target.value;

        switch (inputType) {
            case "number":
                tempValue = Number(tempValue);
                break;
            case "text":
                break;
            default:
                break;
        }

        switch (field) {
            case "title":
                break;
            case "rating":
                // clamp rating within [0-5] range
                tempValue = Math.max(0, Math.min(5, tempValue));
                break;
            case "tagsString":
                break;
            case "prepTime":
                tempValue = tempValue;
                break;
            case "cookTime":
                tempValue = tempValue;
                break;
            case "minServes":
                if (this.state.maxServes < tempValue) {
                    partialState.maxServes = tempValue;
                }
                break;
            case "maxServes":
                if (this.state.minServes > tempValue) {
                    partialState.minServes = tempValue;
                }
                break;
            case "ingredients":
                break;
            case "steps":
                break;
            case "notes":
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
            tagsList,
            new TimingBlock(this.state.prepTime, this.state.cookTime),
            new ServesBlock(this.state.minServes, this.state.maxServes),
            this.state.ingredients
        );

        this.props.onRecipeCreated(newRecipe);

        this.setState({
            title: "",
            rating: 1,
            tagsString: "",
            prepTime: 0,
            cookTime: 0,
            minServes: 0,
            maxServes: 0,
            ingredients: [],
            steps: 0,
            notes: 0,
        });

        event.preventDefault();
    }

    updateIngredientLine(idx, ingredient) {
        let partialState = {
            ingredients: this.state.ingredients.slice(),
        };

        partialState.ingredients[idx] = ingredient;

        this.setState(partialState);
    }

    removeIngredient(idx) {
        let partialState = {
            ingredients: this.state.ingredients.filter(
                (item, index) => idx !== index
            ),
        };

        this.setState(partialState);
    }

    removeStep(idx) {
        let partialState = {
            steps: this.state.steps.filter((item, index) => idx !== index),
        };

        this.setState(partialState);
    }

    removeNote(idx) {
        let partialState = {
            notes: this.state.notes.filter((item, index) => idx !== index),
        };

        this.setState(partialState);
    }

    render() {
        let idx = 0;

        let ingredientsBlocks = [];
        for (idx = 0; idx < this.state.ingredients.length; ++idx) {
            let ingredientLine = this.state.ingredients[idx];
            let localIndex = idx;

            ingredientsBlocks.push(
                <IngredientEditor
                    key={localIndex}
                    item={ingredientLine}
                    onRemoveItem={() => this.removeIngredient(localIndex)}
                    onUpdateIngredient={(ingredient) =>
                        this.updateIngredientLine(localIndex, ingredient)
                    }
                />
            );
        }

        let stepsBlocks = [];
        for (idx = 0; idx < this.state.steps.length; ++idx) {
            let stepGroup = this.state.steps[idx];
            let localIndex = idx;

            stepsBlocks.push(
                <StepEditor
                    key={localIndex}
                    item={stepGroup}
                    onRemoveItem={() => this.removeStep(localIndex)}
                    // onUpdateIngredient={(ingredient) =>
                    //     this.updateIngredientLine(localIndex, ingredient)
                    // }
                />
            );
        }

        let notesBlocks = [];
        for (idx = 0; idx < this.state.notes.length; ++idx) {
            let noteGroup = this.state.notes[idx];
            let localIndex = idx;

            notesBlocks.push(
                <NoteEditor
                    key={localIndex}
                    item={noteGroup}
                    onRemoveItem={() => this.removeNote(localIndex)}
                    // onUpdateIngredient={(ingredient) =>
                    //     this.updateIngredientLine(localIndex, ingredient)
                    // }
                />
            );
        }

        return (
            <>
                <form className="py-3" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            value={this.state.title}
                            onChange={(e) =>
                                this.handleChanged(e, "title", "text")
                            }
                            required
                        />
                    </div>
                    <div>
                        <label>Rating:</label>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={this.state.rating}
                            onChange={(e) =>
                                this.handleChanged(e, "rating", "number")
                            }
                            required
                        />
                        <span>{this.state.rating}</span>
                    </div>
                    <div>
                        <label>
                            Tags:
                            <input
                                type="text"
                                value={this.state.tagsString}
                                onChange={(e) =>
                                    this.handleChanged(e, "tagsString", "text")
                                }
                            />
                        </label>
                    </div>
                    <div>
                        <label>Timings (minutes):</label>
                        <div>
                            <label>Prep:</label>
                            <input
                                type="text"
                                value={this.state.prepTime}
                                onChange={(e) =>
                                    this.handleChanged(e, "prepTime", "number")
                                }
                            />
                        </div>
                        <div>
                            <label>Cook:</label>
                            <input
                                type="text"
                                value={this.state.cookTime}
                                onChange={(e) =>
                                    this.handleChanged(e, "cookTime", "number")
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label>Serves (min-max):</label>
                        <div>
                            <span>
                                <input
                                    type="text"
                                    value={this.state.minServes}
                                    onChange={(e) =>
                                        this.handleChanged(
                                            e,
                                            "minServes",
                                            "number"
                                        )
                                    }
                                />
                            </span>
                            -
                            <span>
                                <input
                                    type="text"
                                    value={this.state.maxServes}
                                    onChange={(e) =>
                                        this.handleChanged(
                                            e,
                                            "maxServes",
                                            "number"
                                        )
                                    }
                                />
                            </span>
                        </div>
                    </div>
                    <div>
                        <label>Ingredients</label>
                        <div>
                            {ingredientsBlocks.length > 0 && (
                                <table>
                                    <thead>
                                        <td></td>
                                        <td>Item</td>
                                        <td>Notes</td>
                                    </thead>
                                    <tbody>{ingredientsBlocks}</tbody>
                                </table>
                            )}

                            <button
                                onClick={(e) => {
                                    let tempIngredients = this.state.ingredients.slice();
                                    tempIngredients.push(new IngredientLine());

                                    let partialState = {
                                        ingredients: tempIngredients,
                                    };

                                    this.setState(partialState);
                                    e.preventDefault();
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div>
                        <label>Steps</label>
                        <div>
                            {stepsBlocks.length > 0 && <div>{stepsBlocks}</div>}

                            <button
                                onClick={(e) => {
                                    let tempSteps = this.state.steps.slice();
                                    tempSteps.push(new StepGroup());
                                    let partialState = {
                                        steps: tempSteps,
                                    };
                                    this.setState(partialState);
                                    e.preventDefault();
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div>
                        <label>Notes</label>
                        <div>
                            {notesBlocks.length > 0 && <div>{notesBlocks}</div>}
                            <button
                                onClick={(e) => {
                                    let tempNotes = this.state.notes.slice();
                                    tempNotes.push(new NoteGroup());
                                    let partialState = {
                                        notes: tempNotes,
                                    };
                                    this.setState(partialState);
                                    e.preventDefault();
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <input type="submit" value="Create" />
                </form>
            </>
        );
    }
}
