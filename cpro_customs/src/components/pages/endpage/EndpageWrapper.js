import React, {Component} from 'react';

import {GlobalState} from "../../context/GlobalState";
import Endpage from "./Endpage";


class EndpageWrapper extends Component {
    render() {
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <Endpage globalState={globalState}/>
                ) }
            </GlobalState.Consumer>
        );
    }
}

export default EndpageWrapper;