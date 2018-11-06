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
                                      onClick={() => {globalState.hasPaid ? this.goToMainPage() : this.goBack()}}/>
                    </div>
                )}
            </GlobalState.Consumer>
        );
    };

    goBack() {
        this.props.history.goBack();
    }

    goToMainPage() {
        console.log("here");
        this.props.history.replace("/")
    }
}

export default withRouter(BackButton);