import React, { Component } from 'react'

import FormControl from '@material-ui/core/FormControl';


const styles =({
	modal: {
		height: '60%',
		width:'80%',
		backgroundColor:'#37424a',
		color: '#e2e3e5',
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
				jisajdklasjdklas djklas djklas jdkasl
			</div>

		)
	}
}