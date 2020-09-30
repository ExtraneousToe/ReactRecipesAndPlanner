import React, { Component } from "react";
import { Navbar, NavItem, NavLink } from "reactstrap";
import { Route, Switch, Link } from "react-router-dom";
import { RecipeList } from "./Recipes/RecipeList";
import { RecipeViewer } from "./Recipes/RecipeViewer";
import RecipeCreator from "./Recipes/RecipeCreator";

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
        let match = this.props.match;

        return (
            <div>
                <Navbar
                    className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
                    light
                >
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink
                                tag={Link}
                                className="text-dark"
                                to="/recipes/list"
                            >
                                List
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag={Link}
                                className="text-dark"
                                to="/recipes/creator"
                            >
                                Creator
                            </NavLink>
                        </NavItem>
                    </ul>
                </Navbar>

                <Switch>
                    <Route path={`${match.url}/list`}>
                        <RecipeList
                            list={this.props.recipeList}
                            onRemoveRecipe={this.props.onRemoveRecipe}
                            onViewRecipe={this.selectViewItem}
                            routingUrl={match.url}
                        />
                    </Route>
                    <Route exact path={`${match.url}/creator`}>
                        <RecipeCreator />
                    </Route>
                    <Route
                        path={`${match.url}/item/:name`}
                        render={(props) => {
                            // return <span>{JSON.stringify(props)}</span>;

                            return <span>{props.match.params.name}</span>;
                        }}
                    />
                </Switch>

                {/*
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
                        onBack={() => {
                            this.selectViewItem(null);
                        }}
                    />
                )}
                {!this.state.viewedItem && (
                    <RecipeList
                        list={this.props.recipeList}
                        onRemoveRecipe={this.props.onRemoveRecipe}
                        onViewRecipe={this.selectViewItem}
                    />
                )}
                */}
            </div>
        );
    }
}

// export default withRouter(Recipes);
