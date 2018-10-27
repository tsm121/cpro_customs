import React, { Component } from 'react'

import Grid from "@material-ui/core/Grid/Grid";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Receipt from "./Receipt";

export default class Endpage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//TODO: This should be sent as a prop from payment component
			QR_url: require("assets/img/receipts/QR_code.png"),
		}

	}

	render = () => {
		const {QR_url} = this.state

		let receipt_block

		if(QR_url.length >= 0){
			receipt_block = <Grid item
			>
				<Receipt QR_url={QR_url}/>
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