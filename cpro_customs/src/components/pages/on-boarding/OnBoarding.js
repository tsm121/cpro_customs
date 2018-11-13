import React, { Component } from 'react'
import NavigationArrow from "../../NavigationArrow";
import InputFields from "../../InputFields";

import Grid from '@material-ui/core/Grid';
import {Modal} from "@material-ui/core";
import CookieNotification from "./CookieNotification";
import {withRouter} from "react-router-dom";


const h1Style = {
    fontFamily: 'Arial, serif',
    fontWeight: 'normal',
    fontSize: '5vw',
    paddingLeft: '3vw',
    paddingRight: '3v',
    marginBottom: '0',
    textAlign: 'center',
    color: '#ffffff',
};

const h1Style_secondary = {
    fontFamily: 'Arial, serif',
    fontWeight: 'normal',
    fontSize: '3vw',
    paddingLeft: '3vw',
    paddingRight: '3vw',
    textAlign: 'center',
    color: '#ffd200'
};

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
                        <h1 style={h1Style}>
                            You need to set up your account
                        </h1>
                        <h3 style={h1Style_secondary}>
                            Please fill out your licence number and email
                        </h3>
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