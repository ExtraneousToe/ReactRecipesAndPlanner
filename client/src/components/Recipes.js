import React, { Component } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { RecipeList } from "./Recipes/RecipeList";
import { RecipeViewer } from "./Recipes/RecipeViewer";

export class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = { viewedItem: null };
        this.selectViewItem = this.selectViewItem.bind(this);
    }

    selectViewItem(item) {
        this.setState({ viewedItem: item });
    }

    render() {
        return (
            <div>
                <ul className="navbar-nav flex-grow">
                    <NavItem>
                        <NavLink
                            tag={Link}
                            className="text-dark"
                            to="/recipecreator"
                        >
                            Create a Recipe
                        </NavLink>
                    </NavItem>
                </ul>
                {this.state.viewedItem && (
                    <RecipeViewer
                        item={this.state.viewedItem}
                        onBack={() => this.selectViewItem(null)}
                    />
                )}
                {!this.state.viewedItem && (
                    <RecipeList
                        list={this.props.recipeList}
                        onRemoveRecipe={this.props.onRemoveRecipe}
                        onViewRecipe={this.selectViewItem}
                    />
                )}
            </div>
        );
    }
}
