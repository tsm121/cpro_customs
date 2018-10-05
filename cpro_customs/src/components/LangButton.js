import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar';

const styles =({
	flag_img: {
		height:'70px',
		width:'70px',
		margin: '10px'
	},

	flag_name: {
		textAlign: 'center'
	}
});


export default class LangButton extends Component  {

	render = () => {
		return (

			<div>
				<Avatar
					src={require('../logo.png')}
					style={styles.flag_img}
				/>
				<h3 style={styles.flag_name}>Norsk</h3>
			</div>

		)
	}
}