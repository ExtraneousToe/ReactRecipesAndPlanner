import React, { Component } from "react";
import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { SplitButton, ButtonGroup, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <header>
                <Navbar
                    className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
                    light
                >
                    <Container>
                        <NavbarBrand tag={Link} to="/">
                            Recipe &amp; Meal Planner
                        </NavbarBrand>
                        <NavbarToggler
                            onClick={this.toggleNavbar}
                            className="mr-2"
                        />
                        <Collapse
                            className="d-sm-inline-flex flex-sm-row-reverse"
                            isOpen={!this.state.collapsed}
                            navbar
                        >
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark"
                                        to="/"
                                    >
                                        Home
                                    </NavLink>
                                </NavItem>
                                <Dropdown as={ButtonGroup} nav inNavbar>
                                    <SplitButton
                                        title="Recipes"
                                        drop="down"
                                        variant="secondary"
                                        href="/recipes/"
                                    >
                                        <Dropdown.Item>
                                            <NavLink
                                                tag={Link}
                                                className="text-dark"
                                                to="/recipes/list"
                                            >
                                                List
                                            </NavLink>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <NavLink
                                                tag={Link}
                                                className="text-dark"
                                                to="/recipes/creator"
                                            >
                                                Creator
                                            </NavLink>
                                        </Dropdown.Item>
                                    </SplitButton>
                                </Dropdown>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark"
                                        to="/planner"
                                    >
                                        Meal Planner
                                    </NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
