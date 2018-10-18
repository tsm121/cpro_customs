import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Months from './months'
import Days from './days'
import HelpTip from "../../HelpTip";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import Divider from "@material-ui/core/Divider/Divider";

const helpText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. 
Praesent non nunc mollis, fermentum neque at, semper arcu. 
Nullam eget est sed sem iaculis gravida eget vitae justo. 
`;

export default class VisaPayment extends Component  {
	constructor() {
		super();
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
				  direction={"column"}

			>
				<Divider/>
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
					<Grid item
						  xs={6}
					>
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

					<Grid item
						  xs={6}
					>

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

						<HelpTip helpText={helpText}/>

					</Grid>

				</Grid>

				<List>
					<ListItem button style={{backgroundColor:"#ffd200"}}>
						<ListItemText
							style={{textAlign:"center", color:"#37424a"}}
							primary={"Pay"}
							onClick={this.getSelected}
						/>
					</ListItem>
				</List>

			</Grid>
		)
	}
}