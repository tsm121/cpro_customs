import React, { Component } from 'react'

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import {Icon} from "@material-ui/core";

const styles = {
	nav_bottom: {
		position:'absolute',
		left:'0',
		bottom:'0',
		right:'0',
		paddingBottom: '1em',
	},
	nav_icon: {
		transform: 'scale(5)'
	}
};

export default class Navigation extends Component  {

	render = () => {
		return (
			<FormControl fullWidth={true} root={true} style={styles.nav_bottom}>
				<Grid container
					  spacing={0}
					  justify="center"
					  alignItems="center"
				>
					<Grid item xl>
						<Icon style={styles.nav_icon}>
							keyboard_arrow_down
						</Icon>
					</Grid>

				</Grid>
			</FormControl>
		)
	}
}