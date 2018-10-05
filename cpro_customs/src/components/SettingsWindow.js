import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import LangButton from "./LangButton";


const styles =({
	modal: {
		height: '60%',
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

					<Grid item md={4}>

						<Grid container spacing={0}
							  direction={"row"}
							  justify={"space-evenly"}
						>

							<Grid item sm={0}>
								<LangButton text={'Norsk'}/>
							</Grid>

							<Grid item sm={0}>
								<LangButton text={'Svenska'}/>
							</Grid>

							<Grid item sm={0}>
								<LangButton text={'English'}/>
							</Grid>


						</Grid>
					</Grid>
				</Grid>
			</div>

		)
	}
}