import React, { Component } from 'react'
import {withRouter} from "react-router";

import { AppBar, Toolbar, Grid, FormControl, Modal } from '@material-ui/core';

import SettingsWindow from "./SettingsWindow";
import BackButton from "./BackButton";
import SettingsButton from "./SettingsButton";
import InputFields from "../InputFields";


class Header extends Component  {
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

                            <Grid item xs={2}>
                                <Grid container
                                      justify={"center"}
                                      alignItems={"center"}
                                >
                                    <SettingsButton
                                        onClick={this.openModal}
                                    />
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
        )
    }
}

export default withRouter(Header);