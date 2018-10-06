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
		webkitBoxShadow:'inset 0 0 5px #7d8f9e',
		mozBoxShadow:'inset 0 0 5px #7d8f9e',
		boxShadow:'inset 0 0 5px #7d8f9e',
		margin: '10px'
	}
});


export default class LangButton extends Component  {
	constructor (props) {
		super(props)
	}

	render = () => {
		const { text, countryName } = this.props

		return (
			<div>
				<Button size={"large"} style={styles.flag_button}>
					<Grid container spacing={0}
						  direction={"column"}
					>
						<Grid item md={0}>
							<Avatar
								src={require(`../assets/lang_icons/${countryName}.png`)}
								style={styles.flag_img}
							/>
						</Grid>
						<Grid item md={0}>
							<h3 style={styles.flag_name}>{text}</h3>
						</Grid>
					</Grid>
				</Button>
			</div>
		)
	}
}