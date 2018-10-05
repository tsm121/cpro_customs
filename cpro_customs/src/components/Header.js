import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Icon } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

export default class Header extends Component  {

	render = () => {
		return (
			<FormControl fullWidth={true} root={true}>
				<AppBar position="static" color="primary" style={{backgroundColor: '#e2e3e5', color: '#37424a'}}>
					<Toolbar>
						<Grid container spacing={16}
							  justify="space-between"
							  alignItems={"center"}
						>

							<Grid
								item sm={3}
							>
								<img
									src={require('../logo.png')}
									style={{maxHeight: '50px'}}
								/>
							</Grid>

							<Grid
								item md={8}
							>
								<h3>Some text</h3>
							</Grid>

							<Grid item xs={1}
							>
								<Icon>settings</Icon>
							</Grid>

						</Grid>
					</Toolbar>
				</AppBar>
			</FormControl>
		)
	}
}