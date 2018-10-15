import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

var userData = {
	licencePlate:'',
	email:'',
}

export default class InputFields extends Component  {
	constructor() {
		super()
		this.state = {
			licencePlateInputError: false,
			emailInputError: false,

		}
	}

	componentWillMount = () => {
		if(!('userData' in localStorage)){
			userData = {
				licencePlate: '',
				email: ''
			}
		}
	}

	onClickHandler = ()=> {
		const {licencePlateInputError, emailInputError} = this.state

		if (!licencePlateInputError && !emailInputError) {
			localStorage.setItem('userData', JSON.stringify(userData))
		}
	}

	toggleEmailInput = (error) => {
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

		if (input.length > 2 && re.test(input)){
			userData.email = input
			setTimeout(this.toggleEmailInput(false),1000)
		} else {
			setTimeout(this.toggleEmailInput(true),1000)

		}
	}

	handleLicencePlateInput = (event) =>{
		var input = event.target.value
		let re = /(^[a-zA-Z]{2}[0-9]{5})$/

		if (re.test(input)){
			userData.licencePlate = input
			setTimeout(this.toggleLicencePlateInput(false),1000)

		} else {
			setTimeout(this.toggleLicencePlateInput(true),1000)

		}
	}

	getLicencePlate = () => {
		if (localStorage.getItem("userData") === null) {
			return ''
		}
		else{
			return JSON.parse(localStorage.getItem('userData')).licencePlate

		}
	}

	getEmailPlate = () => {
		if (localStorage.getItem("userData") === null) {
			return ''
		}
		else{
			return JSON.parse(localStorage.getItem('userData')).email
		}
	}
	render = () => {
		const {light} = this.props
		const{licencePlateInputError,emailInputError } = this.state

		return (

			<div>
				<Grid container
					  justify={"center"}
					  alignItems={"center"}
					  direction={"row"}
					  style={{marginTop:'1em'}}
				>
					<Grid item>

						<TextField
							id="outlined-licence-name"
							label="License plate"
							placeholder="AA12345"
							margin="normal"
							variant="outlined"
							style={{margin:'5px', height:'auto'}}
							className={light ? 'light' : ''}
							onChange={this.handleLicencePlateInput}
							error={licencePlateInputError}
							defaultValue={this.getLicencePlate()}
						/>
					</Grid>

					<Grid item>

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
							defaultValue={this.getEmailPlate()}
						/>
					</Grid>
				</Grid>

				<Grid container
					  justify={"center"}
					  alignItems={"center"}
					  direction={"row"}
					  style={{marginTop:'1em'}}
				>



					<Button
						variant={'outlined'}
						onClick={this.onClickHandler}
						style={light ? {backgroundColor:'white'} : {backgroundColor:'transparent'}}
					>
						Save
					</Button>
				</Grid>
			</div>
		)
	}
}