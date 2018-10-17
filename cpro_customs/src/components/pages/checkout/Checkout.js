import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Months from './months'
import Days from './days'


export default class Checkout extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			month: '',
			day: '',
		}

	}


	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	render = () => {
		return (
			<Grid container
				  spacing={8}
				  justify="center"
				  alignItems="center"
				  direction="column"
			>
				<Grid container
					  spacing={16}
					  direction="column"
					  justify="center"
					  alignItems="center"
					  style={{width:'35em', backgroundColor:"white", padding:'2em'}}

				>

					<Grid item>
						<TextField
							fullWidth={true}
							id="card-number"
							label="Card number"
							placeholder="1234 1234 1234 1234"
							margin="normal"
							variant="outlined"
							inputProps={{ maxLength: 16 }}


						/>

						<Grid container
							  justify="center"
							  alignItems="center"
							  direction={"row"}
						>
							<Grid container
								  alignItems="center"
								  justify="center"
								  xs={6}>
								<TextField
									fullWidth={true}
									style={{marginRight:'4px'}}
									id="expire-month"
									select
									label="Month"
									margin="normal"
									variant="outlined"
									value={this.state.month}
									onChange={this.handleChange('month')}
								>

									{Months.map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.value}
										</MenuItem>
									))}

								</TextField>
							</Grid>

							<Grid container
								  alignItems="center"
								  justify="center"
								  xs={6}>

								<TextField
									fullWidth={true}
									style={{marginLeft:'4px'}}
									id="expire-day"
									select
									label="Day"
									margin="normal"
									variant="outlined"
									value={this.state.day}
									onChange={this.handleChange('day')}
								>

									{Days.map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.value}
										</MenuItem>
									))}

								</TextField>
							</Grid>
						</Grid>
						<Grid container
							  alignItems="center"
							  justify="center"
							  xs={6}>
							<TextField
								fullWidth={true}
								type="password"
								id="security-code"
								label="CVV code"
								placeholder="123"
								margin="normal"
								variant="outlined"
								inputProps={{ maxLength: 3 }}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}