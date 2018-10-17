import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import {Icon} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';


import Months from './months'
import Days from './days'


const helpText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. 
Praesent non nunc mollis, fermentum neque at, semper arcu. 
Nullam eget est sed sem iaculis gravida eget vitae justo. 
`;

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
				<Card
					raised={true}
				>
					<CardContent>

						<h1 style={{color:'#404040'}}>
							Payment
						</h1>
						<Divider/>

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
								  direction={"row"}
							>
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

								<Grid container
									  alignItems="center"
									  justify="center"
									  xs={2}>

									<Tooltip
										title={helpText}
										placement='bottom'
										TransitionComponent={Zoom}
									>
										<Icon
											style={{color:'#404040'}}
										>
											help
										</Icon>
									</Tooltip>

								</Grid>

							</Grid>

						</Grid>
					</CardContent>
				</Card>
			</Grid>
		)
	}
}