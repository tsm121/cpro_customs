import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Icon } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import SettingsWindow from "./SettingsWindow";

export default class Navbar extends Component  {
	constructor(){
		super()

		this.state = {
			open: false,
		}
	}

	/**
	 * This method is used to trigger opening this Modal.
	 */
	handleOpen = () => {
		this.setState({ open: true })
	}

	/**
	 * This method is used to trigger closing this Modal.
	 */
	handleClose = () => {
		this.setState({ open: false })
	}

	render = () => {

		return (
			<FormControl fullWidth={true} root={true}>
				<AppBar position="static" color="primary" style={{backgroundColor: '#e2e3e5', color: '#37424a'}}>
					<Toolbar>
						<Grid container spacing={16}
							  justify="space-between"
							  alignItems={"center"}
						>

							<Grid item sm={2}>
								<img
									src={require('assets/navbar/logo.png')}
									style={{maxHeight: '50px'}}
									alt={"Logo"}
								/>
							</Grid>

							<Grid item md={8}>
								<h3>Norwegian Customs</h3>
							</Grid>

							<Grid item xs={2}>
								<IconButton>
									<Icon onClick={this.handleOpen}>
										settings
									</Icon>
								</IconButton>
							</Grid>

						</Grid>
					</Toolbar>
				</AppBar>

				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}
				>
					<div>
						<SettingsWindow/>
					</div>
				</Modal>

			</FormControl>
		)
	}
}