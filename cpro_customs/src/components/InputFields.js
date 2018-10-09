import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

var userData = {
	licencePlate:'AA12345',
	email:'mail@mail.com',
}

export default class InputFields extends Component  {
	constructor() {
		super()
		this.timeout =  0;

		this.state = {
			light: false,
			licencePlateInputError: false,
			emailInputError: false,

		}
	}

	componentWillMount = () => {
		localStorage.setItem('userData', JSON.stringify(userData))
	}

	onClickHandler = ()=> {
		console.log(userData)
		localStorage.setItem('userData', JSON.stringify(userData))
	}

	toggleEmailInput = (error) => {
		const {emailInputError} = this.state
		if (error) {
			this.setState({
				emailInputError: true
			})
		} else {
			this.setState({
				emailInputError: false
			})
		}

	}

	toggleLicencePlateInput = (error) => {
		const {emailInputError} = this.state
		if (error) {
			this.setState({
				licencePlateInputError: true
			})
		} else {
			this.setState({
				licencePlateInputError: false
			})
		}

	}

	handleEmailInput = (event) =>{
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		var input = event.target.value

		if (re.test(input)){
			userData.email = input
			setTimeout(this.toggleEmailInput(false),1000)
		} else {
			setTimeout(this.toggleEmailInput(true),1000)
		}
	}

	handleLicencePlateInput = (event) =>{
		var input = event.target.value
		let re = /(^[A-z]{2,2}\d{4,4}?\S)$/

		if (re.test(input)){
			console.log(input)
			userData.licencePlate = input
			setTimeout(this.toggleLicencePlateInput(false),1000)
		} else {
			setTimeout(this.toggleLicencePlateInput(true),1000)
		}
	}

	render = () => {
		const {light} = this.props
		const{licencePlateInputError,emailInputError } = this.state

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
					onChange={this.handleLicencePlateInput}
					error={licencePlateInputError}

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
					onChange={this.handleEmailInput}
					error={emailInputError}



				/>

				<Grid item>
					<Button
						variant={'outlined'}
						onClick={this.onClickHandler}
					>
						Save
					</Button>
				</Grid>
			</div>
		)
	}
}