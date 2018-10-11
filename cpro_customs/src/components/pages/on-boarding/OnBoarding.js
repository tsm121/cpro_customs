import React, { Component } from 'react'
import NavigationArrow from "../../NavigationArrow";
import InputFields from "../../InputFields";

import Grid from '@material-ui/core/Grid';


const h1Style = {
	fontFamily: 'Arial, serif',
	fontWeight: 'normal',
	fontSize: '5vw',
	paddingLeft: '3vw',
	paddingRight: '3v',
	marginBottom: '0',
	textAlign: 'center',
	color: '#ffffff',
};

const h1Style_secondary = {
	fontFamily: 'Arial, serif',
	fontWeight: 'normal',
	fontSize: '3vw',
	paddingLeft: '3vw',
	paddingRight: '3vw',
	textAlign: 'center',
	color: '#ffd200'
};

export default class OnBoarding extends Component  {

	render = () => {
		return (

			<div>

				<Grid container
					  spacing={0}
					  direction={'column'}
					  justify={'center'}
					  alignItems={'center'}

				>

					<Grid item xl={2}>
						<h1 style={h1Style}>
							You need to set up your account
						</h1>
						<h3 style={h1Style_secondary}>
							Please fill out your licence number and email
						</h3>
					</Grid>
					<Grid item xl={1} style={{marginTop:'5%'}}>
						<InputFields light={true} />
					</Grid>

				</Grid>

				<NavigationArrow direction={"down"}/>
			</div>

		)
	}
}