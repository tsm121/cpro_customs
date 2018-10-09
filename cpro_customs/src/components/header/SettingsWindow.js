import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';

import LangButton from "./LangButton";
import Exit from "./Exit";
import InputFields from "../InputFields";

const styles =({
	modal: {
		display: 'block',
		overflow: 'auto',
		minWidth: '60%',
		maxHeight: '80%',
		paddingRight: '8vw',
		paddingLeft: '8vw',
		paddingBottom: '12vw',
		backgroundColor:'#e2e3e5',
		color: '#37424a',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	},
	title: {
		marginBottom:'0',
		padding: '0',
	}
});

export default class SettingsWindow extends Component  {

	render = () => {

		return (

			<div style={styles.modal}>

				<Grid container spacing={16}
					  justify="space-between"
					  alignItems={"center"}
					  direction={"column"}
				>

					<Grid item md={4} >
						<h1 style={styles.title}>Settings</h1>
					</Grid>

					<Grid item md={0}>
						<h3 style={styles.title}>
							Language selection
						</h3>
					</Grid>

					<Grid item md={0}>
						<Grid container spacing={0}
							  direction={"row"}
							  justify={"center"}

						>
							<Grid item sm={0}>
								<LangButton text={'Norsk'} countryName={'norway'}/>
							</Grid>

							<Grid item sm={0}>
								<LangButton text={'Svenska'} countryName={'sweden'}/>
							</Grid>

							<Grid item sm={0}>
								<LangButton text={'English'} countryName={'uk'}/>
							</Grid>

						</Grid>
					</Grid>

					<Grid item md={0}>
						<h3 style={styles.title}>
							Personal settings
						</h3>
					</Grid>
					<Grid item md={0}>
					<InputFields/>
					</Grid>

				</Grid>

				<div>
					<Exit/>
				</div>
			</div>

		)
	}
}