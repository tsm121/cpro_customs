import React, { Component } from 'react'

import Grid from "@material-ui/core/Grid/Grid";

export default class Receipt extends Component {
	render = () => {
		const {QR_url} = this.props
		return(
			<Grid container
				  direction={"column"}
				  justify={"center"}
				  alignItems={"center"}
			>
				<Grid item>
					<h3 className={"modal_title"}>
						Declaration receipt:
					</h3>
				</Grid>

				<Grid item>
					<img
						src={QR_url}
						className={"QR_code"}
						alt={"icon"}
					/>
				</Grid>
			</Grid>
		)
	}
}