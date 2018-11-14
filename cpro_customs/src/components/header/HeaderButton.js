import React, { Component } from 'react'

import {Icon, IconButton} from "@material-ui/core";


class HeaderButton extends Component {
    render = () => {
        const {icon, onClick} = this.props;
        return (
            <IconButton onClick={onClick}
                        onMouseOver={this.onMouseOver}
                        onMouseOut={this.onMouseOut}
                        role="button"
                        type="submit"
                        value="page back"
                        aria-label="page back"
            >
                <Icon>
                    {icon}
                </Icon>
            </IconButton>
        )
    };
    onMouseOver = () => {
        document.body.style.cursor = "pointer";
    };

    onMouseOut = () => {
        document.body.style.cursor = "default";
    };
}

export default HeaderButton;