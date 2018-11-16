import React, { Component } from 'react'

import Grid from "@material-ui/core/Grid/Grid";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Receipt from "./Receipt";

export default class Endpage extends Component {
	render = () => {
		const {globalState} = this.props;

		let receipt_block;

		if(globalState.QRUrl.length >= 0){
			receipt_block = <Grid item
			>
				<Receipt QR_url={globalState.QRUrl + ""}/>
			</Grid>
		} else {
			receipt_block = ""
		}
		return(
			<FormControl fullWidth={true}>
				<Grid container
					  spacing={0}
					  justify="center"
					  alignItems="center"
					  direction="column"
				>
					<Grid item>
						<h1 className={"h1Style"}>
							Thank you for your time.
						</h1>
					</Grid>
					<Grid item
					>
						<h1 className={"h1Style_secondary_big"}>
							Welcome to Norway!
						</h1>
					</Grid>

					{receipt_block}
				</Grid>
			</FormControl>
		)
	}
}