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
	constructor (props) {
		super(props)
	}

	render = () => {
		const { text } = this.props

		return (

			<div>
				<Avatar
					src={require('../logo.png')}
					style={styles.flag_img}
				/>
				<h3 style={styles.flag_name}>{text}</h3>
			</div>

		)
	}
}