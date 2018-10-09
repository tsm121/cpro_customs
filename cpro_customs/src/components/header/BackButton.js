import React, { Component } from 'react'
import { withRouter } from 'react-router'

import {Icon, IconButton} from "@material-ui/core";



class BackButton extends Component  {
    render = () => {
        return (
            <IconButton onClick={this.handleBack}>
                <Icon>
                    keyboard_arrow_left
                </Icon>
            </IconButton>
        );
    };

    handleBack = () => {
	    this.props.history.goBack();
    }
}

export default withRouter(BackButton);