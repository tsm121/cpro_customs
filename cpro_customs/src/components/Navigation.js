import React, { Component } from 'react'
import svg_nav_icon from '../App.css'

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import {Icon} from "@material-ui/core";

const nav_bottom  ={
	position:'absolute',
	left:'0',
	bottom:'0',
	right:'0',
	paddingBottom: '2em',
};

export default class Navigation extends Component  {

	render = () => {
		return (
			<FormControl fullWidth={true} root={true} style={nav_bottom}>
				<Grid container
					  spacing={0}
					  justify="center"
					  alignItems="center"
				>
					<Grid item xl>
						<Icon className={{svg_nav_icon}}>keyboard_arrow_down</Icon>
					</Grid>

				</Grid>
			</FormControl>
		)
	}
}