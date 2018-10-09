import React, { Component } from 'react'
import {Icon, IconButton} from "@material-ui/core";

class SettingsButton extends Component  {
    render = () => {
        const {onClick} = this.props;
        return (
            <IconButton onClick={onClick}>
                <Icon>
                    settings
                </Icon>
            </IconButton>
        );
    };
}

export default SettingsButton;