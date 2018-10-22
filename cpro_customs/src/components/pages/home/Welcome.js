import React, { Component } from 'react'

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

export default class Welcome extends Component  {
	render = () => {
		return (
			<FormControl fullWidth={true}>
				<Grid container
					  spacing={0}
					  justify="center"
					  alignItems="center"
					  direction="column"
				>
					<Grid item>
						<h1 className={"h1Style"}>
							You are approaching the Norwegian boarder
						</h1>
					</Grid>
					<Grid item>
						<h1 className={"h1Style_secondary"}>
							Please declare your goods
						</h1>
					</Grid>
				</Grid>
			</FormControl>
		)
	}
}