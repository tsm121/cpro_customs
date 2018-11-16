import React, {Component} from 'react'
import {withRouter} from "react-router";

import {AppBar, FormControl, Grid, Icon, Modal, Toolbar} from '@material-ui/core';

import SettingsWindow from "./SettingsWindow";
import BackButton from "./BackButton";
import SettingsButton from "./SettingsButton";
import ShoppingCartButton from "./ShoppingCartButton";
import {GlobalState} from "../context/GlobalState";
import IconButton from '@material-ui/core/IconButton';


const EXLUDED_PAGES = ["/", "/persons-in-vehicle", "/on-boarding", "/endpage"]



class Header extends Component {
    constructor() {
        super();

        this.state = {
            showSettingsModal: false,
            showCategories: false,
        }
    }

    /**
     * This method is used to trigger opening this Modal.
     */
    openModal = () => {
        this.setState({showSettingsModal: true});
    }

    /**
     * This method is used to trigger closing this Modal.
     */
    closeModal = () => {
        this.setState({showSettingsModal: false})
    }

    hideCategories = () => {
        let current_location = this.props.history.location.pathname
        console.log(EXLUDED_PAGES.includes(current_location))
        console.log( )


        if(EXLUDED_PAGES.includes(current_location)) {
            return true
        } else {
            return false
        }
    }

    handleCategoriesButton = () => {
            this.props.history.push("/categories");
    }

    render = () => {
        const {pathname} = this.props.location;
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <FormControl fullWidth={true} className={"header_container"}>
                        <AppBar position="static"
                                color="primary"
                                className={"header_bar"}
                        >
                            <Toolbar>
                                <Grid container
                                      spacing={16}
                                      justify="space-between"
                                      alignItems={"center"}
                                >
                                    <Grid item xs={5}>


                                        {/* do not show back button when on landing page */}
                                        {pathname === "/" ? null :
                                            <Grid container
                                                  justify={"center"}
                                                  alignItems={"center"}
                                            >

                                                <Grid item xs={12} sm={7} md={7}>
                                                    <Grid container
                                                          justify={"flex-start"}
                                                          alignItems={"center"}
                                                          className={"menu_container_left"}
                                                    >
                                                <BackButton/>

                                                <IconButton
                                                    onClick={this.handleCategoriesButton}
                                                    role="button"
                                                    type="submit"
                                                    value="page categories"
                                                    aria-label="page categories"
                                                    style={this.hideCategories() ? {display:"none"}: {display:"unset"} }
                                                >
                                                    <Icon>
                                                        view_module
                                                    </Icon>
                                                </IconButton>

                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        }
                                    </Grid>

                                    <Grid item xs={5}>
                                        <Grid container
                                              justify={"center"}
                                              alignItems={"center"}
                                        >
                                            <Grid item xs={12} sm={7} md={7}>
                                                <Grid container
                                                      justify={"flex-end"}
                                                      alignItems={"center"}
                                                      className={"menu_container_right"}

                                                >
                                                    {globalState.products.length > 0 && !globalState.hasPaid ?
                                                        <ShoppingCartButton/> : ""}
                                                    <SettingsButton onClick={this.openModal}/>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>

                        <Modal
                            open={this.state.showSettingsModal}
                            onClose={this.closeModal}
                        >
                            <div>
                                <SettingsWindow
                                    closeModal={this.closeModal}
                                />
                            </div>
                        </Modal>

                    </FormControl>
                )}
            </GlobalState.Consumer>
        )
    }
}

export default withRouter(Header);