import React, {Component} from 'react'
import {withRouter} from 'react-router'

import HeaderButton from "./HeaderButton"
import {GlobalState} from "../context/GlobalState";


class BackButton extends Component {
    constructor(props) {
        super(props);
        this.goToMainPage = this.goToMainPage.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    render = () => {
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <div>
                        <HeaderButton icon={"keyboard_arrow_left"}
                                      onClick={() => {globalState.hasPaid ? this.goToMainPage(globalState) : this.goBack()}}/>
                    </div>
                )}
            </GlobalState.Consumer>
        );
    };

    goBack() {
        this.props.history.goBack();
    }

    goToMainPage(globalState) {
        // reset global state
        globalState.resetState();

        // route to main page
        this.props.history.replace("/")
    }
}

export default withRouter(BackButton);