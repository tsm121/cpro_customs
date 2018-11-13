import React, {Component} from 'react';

import {GlobalState} from "../../context/GlobalState";
import PersonsInVehicle from "./PersonsInVehicle";


class PersonsInVehicleWrapper extends Component {
    render() {
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <PersonsInVehicle globalState={globalState}/>
                ) }
            </GlobalState.Consumer>
        );
    }
}

export default PersonsInVehicleWrapper;