import React, {Component} from 'react';

import {GlobalState} from "../../context/GlobalState";
import ShoppingCart from "./ShoppingCart";


class StateWrapper extends Component {
    render() {
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <ShoppingCart globalState={globalState}/>
                ) }
            </GlobalState.Consumer>
        );
    }
}

export default StateWrapper;