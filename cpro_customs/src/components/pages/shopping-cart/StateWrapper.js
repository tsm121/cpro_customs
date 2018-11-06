import React, {Component} from 'react';

import {GlobalState} from "../../global_state/GlobalState";
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