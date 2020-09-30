import React from "react";
import { Navbar, NavItem, NavLink } from "reactstrap";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import { RecipeList } from "./Recipes/RecipeList";
import { RecipeViewer } from "./Recipes/RecipeViewer";
import RecipeCreator from "./Recipes/RecipeCreator";

export function Recipes(props) {
    let match = useRouteMatch();

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
                        list={props.recipeList}
                        onRemoveRecipe={props.onRemoveRecipe}
                        routingUrl={match.url}
                    />
                </Route>
                <Route exact path={`${match.url}/creator`}>
                    <RecipeCreator onRecipeCreated={props.onCreateRecipe} />
                </Route>
                <Route
                    path={`${match.url}/item/:name`}
                    render={(routeProps) => {
                        let soughtName = routeProps.match.params.name;
                        soughtName = soughtName.replace(/\s+/g, "");

                        let searching = [];

                        let item = props.recipeList.filter((item, index) => {
                            searching.push(item.title);
                            return (
                                item.title.replace(/\s+/g, "") === soughtName
                            );
                        })[0];

                        // return <span>{JSON.stringify(item)}</span>;

                        return (
                            <RecipeViewer
                                list={props.recipeList}
                                recipeItem={item}
                            />
                        );
                    }}
                ></Route>
            </Switch>
        </div>
    );
}

// export default withRouter(Recipes);
