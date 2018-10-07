import React, { Component } from 'react'

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

const h1Style = {
	fontFamily: 'Arial, serif',
	fontWeight: 'normal',
	fontSize: '5vw',
	paddingLeft: '3vw',
	paddingRight: '3v',
	marginBottom: '0',
	textAlign: 'center',
};

const h1Style_secondary = {
	fontFamily: 'Arial, serif',
	fontWeight: 'normal',
	fontSize: '5vw',
	paddingLeft: '3vw',
	paddingRight: '3vw',
	textAlign: 'center',
	color: '#ffd200'
};

export default class Welcome extends Component  {

	render = () => {
		return (
			<FormControl fullWidth={true} root={true}>
				<Grid container
					  spacing={0}
					  justify="center"
					  alignItems="center"
					  direction="column"
				>
					<Grid item sm>
						<h1 style={h1Style}>
							You are approaching the Norwegian boarder
						</h1>
					</Grid>
					<Grid item sm>
						<h1 style={h1Style_secondary}>
							Please declare your goods						</h1>
					</Grid>
				</Grid>
			</FormControl>
		)
	}
}