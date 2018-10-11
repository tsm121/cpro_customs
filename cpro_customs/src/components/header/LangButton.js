import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles =({
	flag_img: {
		height:'70px',
		width:'70px',
		margin: '10px'
	},

	flag_name: {
		textAlign: 'center',
		margin:'0px',
	},

	flag_button: {

		borderRadius: '0',
		WebkitBoxShadow:'inset 0 0 5px #7d8f9e',
		MozBoxShadow:'inset 0 0 5px #7d8f9e',
		boxShadow:'inset 0 0 5px #7d8f9e',
		margin: '10px'
	}
});


export default class LangButton extends Component  {
	render = () => {
		const { text, countryName } = this.props

		return (
			<div>
				<Button size={"large"} style={styles.flag_button}>
					<Grid container spacing={8}
						  direction={"column"}
					>
						<Grid item>
							<Avatar
								src={require(`assets/header/lang_icons/${countryName}.png`)}
								style={styles.flag_img}
							/>
						</Grid>
						<Grid item>
							<h3 style={styles.flag_name}>{text}</h3>
						</Grid>
					</Grid>
				</Button>
			</div>
		)
	}
}