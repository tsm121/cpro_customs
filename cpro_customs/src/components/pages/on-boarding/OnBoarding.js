import React, { Component } from 'react'
import InputFields from "../../InputFields";

import Grid from '@material-ui/core/Grid';
import {Modal} from "@material-ui/core";
import CookieNotification from "./CookieNotification";
import {withRouter} from "react-router-dom";

class OnBoarding extends Component  {
    constructor() {
        super();

        this.state = {
            showCookieModal: true,
        }
    }

    /**
     * This method is used to trigger opening this Modal.
     */
    openModal = () => {
        this.setState({showCookieModal: true});
    }

    /**
     * This method is used to trigger closing this Modal.
     */
    closeModal = () => {
        this.setState({showCookieModal: false})
    }

    render = () => {
        return (

            <div>
                <Grid container
                      spacing={0}
                      direction={'column'}
                      justify={'center'}
                      alignItems={'center'}
                >

                    <Grid item>
                        <h2 className={"cdp cdp_primary"}>
                            You need to set up your account
                        </h2>
                        <h2 className={"cdp cdp_secondary"}>
                            Please fill out your<br/> licence number and email
                        </h2>
                    </Grid>
                    <Grid item
                          style={{marginTop:'5%'}}
                    >
                        <InputFields
                            light={true}
                            on_boarding={true}
                        />
                    </Grid>

                </Grid>

                <Modal
                    open={this.state.showCookieModal}
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
                    disableAutoFocus={true}
                    onClose={this.closeModal}
                >
                    <CookieNotification
                        closeModal={this.closeModal}
                    />
                </Modal>

            </div>
        )
    }
}
export default withRouter(OnBoarding);