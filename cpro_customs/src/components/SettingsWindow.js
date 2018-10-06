import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import LangButton from "./LangButton";
import TextField from '@material-ui/core/TextField';




const styles =({
	modal: {
		height: '80%',
		width:'80%',
		backgroundColor:'#e2e3e5',
		color: '#37424a',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
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
						<h1>Settings</h1>
					</Grid>

					<Grid item md={0}>

						<Grid container spacing={0}
							  direction={"row"}
							  justify={"space-evenly"}
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

						<TextField
							id="outlined-licence-name"
							label="License plate"
							placeholder="AA12345"
							margin="normal"
							variant="outlined"
							style={{margin:'5px'}}
						/>

						<TextField
							id="outlined-email-input"
							label="Email"
							placeholder="mail@mail.com"
							type="email"
							name="email"
							autoComplete="email"
							margin="normal"
							variant="outlined"
							style={{margin:'5px'}}

						/>

					</Grid>

				</Grid>
			</div>

		)
	}
}