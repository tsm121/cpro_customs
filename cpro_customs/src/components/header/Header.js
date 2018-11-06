import React, {Component} from 'react'
import {withRouter} from "react-router";

import {AppBar, FormControl, Grid, Modal, Toolbar} from '@material-ui/core';
import Button from "@material-ui/core/Button/Button";

import SettingsWindow from "./SettingsWindow";
import BackButton from "./BackButton";
import SettingsButton from "./SettingsButton";
import ShoppingCartButton from "./ShoppingCartButton";
import {GlobalState} from "../context/GlobalState";


class Header extends Component {
    constructor() {
        super();

        this.state = {
            showSettingsModal: false,
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
                                    <Grid item xs={2}>
                                        {/* do not show back button when on landing page */}
                                        {pathname === "/" ? null :
                                            <Grid container
                                                  justify={"center"}
                                                  alignItems={"center"}
                                            >
                                                <BackButton/>
                                            </Grid>
                                        }
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Grid container
                                              justify={"center"}
                                              alignItems={"center"}
                                        >
                                            <Grid item xs={12} sm={7} md={7}>
                                                <Grid container
                                                      justify={"flex-end"}
                                                      alignItems={"center"}
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