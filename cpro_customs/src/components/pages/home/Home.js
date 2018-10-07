import React, { Component } from 'react';

import Welcome from "./Welcome";
import Navigation from "./Navigation";

class Home extends Component {
    render() {
        return (
            <div>
                <Welcome/>
                <Navigation/>
            </div>
        );
    }
}

export default Home;