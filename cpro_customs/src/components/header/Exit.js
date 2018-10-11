import React, { Component } from 'react'

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import {Icon} from "@material-ui/core";

const styles = {
	exit_bottom: {
		position:'absolute',
		left:'0',
		bottom:'0',
		right:'0',
		paddingBottom: '1em',
	},

	exit_text: {
		margin:'0',
		paddingBottom: '5px',
	},
	exit_icon: {
		transform: 'scale(3)'
	}
};

export default class Exit extends Component  {

	render = () => {
		return (
			<FormControl fullWidth={true} style={styles.exit_bottom}>
				<Grid container
					  spacing={0}
					  justify="center"
					  alignItems="center"
					  direction={"column"}

				>
					<Grid item xl>
						<h1 style={styles.exit_text}>Exit</h1>
					</Grid>
					<Grid item xl>
						<Icon style={styles.exit_icon}>
							keyboard_arrow_down
						</Icon>
					</Grid>

				</Grid>
			</FormControl>
		)
	}
}