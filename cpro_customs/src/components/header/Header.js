import React, { Component } from 'react'
import {withRouter} from "react-router";

import { AppBar, Toolbar, Grid, FormControl, Modal } from '@material-ui/core';

import SettingsWindow from "./SettingsWindow";
import BackButton from "./BackButton";
import SettingsButton from "./SettingsButton";
import HeaderButton from "./HeaderButton";


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
            <FormControl fullWidth={true}>
                <AppBar position="static"
                        color="primary"
                        style={{backgroundColor:'#e2e3e5', color:'#37424a'}}
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
                                    <HeaderButton icon={"shopping_cart"} onClick={() => {this.props.history.push("/declaration-list");}}/>
                                    <SettingsButton onClick={this.openModal}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.showSettingsModal}
                    onClose={this.closeModal}
                >
                    <div>
                        <SettingsWindow/>
                    </div>
                </Modal>

            </FormControl>
        )
    }
}

export default withRouter(Header);