import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';

export default class InputFields extends Component  {
	constructor() {
		super()
		this.state = {
			light: false
		}
	}

	render = () => {
		const {light} = this.props

		return (
					<div>
						<TextField
							id="outlined-licence-name"
							label="License plate"
							placeholder="AA12345"
							margin="normal"
							variant="outlined"
							style={{margin:'5px'}}
							className={light ? 'light' : ''}

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
							className={light ? 'light' : ''}


						/>
					</div>
		)
	}
}