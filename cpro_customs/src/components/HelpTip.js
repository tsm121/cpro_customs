import {Component} from "react";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Zoom from "@material-ui/core/Zoom/Zoom";
import {Icon} from "@material-ui/core";
import React from "react";

export default class HelpTip extends Component  {
	render = () => {
		const {helpText} = this.props
		return (

			<Tooltip
				title={helpText}
				placement='bottom'
				TransitionComponent={Zoom}
			>
				<Icon
					style={{color:'#404040'}}
				>
					help
				</Icon>
			</Tooltip>

		)
	}
}