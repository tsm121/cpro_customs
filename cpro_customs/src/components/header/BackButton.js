import React from 'react'
import { withRouter } from 'react-router'

import HeaderButton from "./HeaderButton"


class BackButton extends HeaderButton  {
    render = () => {
        return (
            <HeaderButton icon={"keyboard_arrow_left"} onClick={this.onClick.bind(this)}/>
        );
    };

    onClick() {
	    this.props.history.goBack();
    }
}

export default withRouter(BackButton);