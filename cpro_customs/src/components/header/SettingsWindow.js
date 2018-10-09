import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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
	constructor(props) {
		super(props);
		this.state = {

		};
	}


	render = () => {

		return (

			<div style={styles.modal}>

				<Grid container spacing={16}
					  justify="space-between"
					  alignItems={"center"}
					  direction={"column"}
				>

					<Grid item md={1} >
						<h1 style={styles.title}>Settings</h1>
					</Grid>

					<Grid item md={1}>
						<h3 style={styles.title}>
							Language selection
						</h3>
					</Grid>

					<Grid item xl={3}>
						<Grid container spacing={0}
							  direction={"row"}
							  justify={"center"}

						>
							<Grid item>
								<LangButton text={'Norsk'} countryName={'norway'}/>
							</Grid>

							<Grid item>
								<LangButton text={'Svenska'} countryName={'sweden'}/>
							</Grid>

							<Grid item>
								<LangButton text={'English'} countryName={'uk'}/>
							</Grid>

						</Grid>
					</Grid>

					<Grid item>
						<h3 style={styles.title}>
							Personal settings
						</h3>
					</Grid>

					<InputFields/>

				</Grid>

				<div>
					<Exit/>
				</div>
			</div>

		)
	}
}