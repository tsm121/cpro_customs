import React, { Component } from 'react'

import HeaderButton from "./HeaderButton";


class SettingsButton extends Component  {
	render = () => {
		const {onClick} = this.props;
		return (
			<HeaderButton icon={"settings"} onClick={onClick}/>
		);
	};
}

export default SettingsButton;