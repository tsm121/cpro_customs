import React, { Component } from 'react';

import Welcome from "./Welcome";
import NavigationArrow from "../../NavigationArrow";

class Home extends Component {
	render() {
		return (
			<div>
				<Welcome/>
				<NavigationArrow direction={"down"}
								 page={"persons-in-vehicle"}
				/>
			</div>
		);
	}
}

export default Home;