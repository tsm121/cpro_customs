import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from "@material-ui/core/Divider/Divider";

import Months from '../../../data/months'
import Days from '../../../data/days'
import HelpTip from "../../HelpTip";
import HandlePayment from "./HandlePayment";
import {TOOL_TIP_TEXTS} from "../../../data/ToolTipTexts";

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
		const {totalSum, selectedCurrency, paymentComplete} = this.props
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
							className={"month_input"}
							id="expire-month"
							select
							label="Month"
							margin="normal"
							variant="outlined"
							value={this.state.month}
							onChange={this.handleChange('month')}
						>

							{Months.map(option => (
								<MenuItem
									key={option.value}
									value={option.value}>
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
							className={"day_input"}
							id="expire-day"
							select
							label="Day"
							margin="normal"
							variant="outlined"
							value={this.state.day}
							onChange={this.handleChange('day')}
						>

							{Days.map(option => (
								<MenuItem
									key={option.value}
									value={option.value}>
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
						  className={"payment_CVV_container"}
					>
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
						  className={"payment_help_container"}
					>
						<HelpTip text={TOOL_TIP_TEXTS.payment.visaPayment}/>
					</Grid>

				</Grid>
				<HandlePayment
					totalSum={totalSum}
					selectedCurrency={selectedCurrency}
					paymentComplete={paymentComplete}
				/>
			</Grid>
		)
	}
}