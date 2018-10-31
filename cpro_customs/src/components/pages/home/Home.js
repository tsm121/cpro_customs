import React, { Component } from 'react';

import Welcome from "./Welcome";
import NavigationArrow from "../../NavigationArrow";

class Home extends Component {
    constructor() {
        super();
        this.state ={
            nextPage: "on-boarding"
        }
    }

    checkIfNewUser = () => {
        if('userData' in localStorage) {
            this.setState({
                nextPage: "persons-in-vehicle"
            })
        }
    }

    componentDidMount() {
        this.checkIfNewUser()
    }

    render() {
        const {nextPage} = this.state
		return (
			<div>
				<Welcome/>
				<NavigationArrow direction={"down"}
								 page={nextPage}
				/>
			</div>
		);
	}
}

export default Home;