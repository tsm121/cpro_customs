import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {Icon} from "@material-ui/core";

import PaymentSelection from "./PaymentSelection";
import VisaPayment from "./VisaPayment";

export default class Checkout extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			month: '',
			day: '',
			selection: '',
			stageSelection: false,
			stageVisa: true,
		}

	}


	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	userSelection = (selection) => {
		if(selection === "visa") {
			this.setState({
				stageSelection: false,
				stageVisa: true,
			})
		}
	}

	handleGoBackButton = () => {
		this.setState({
			stageSelection: true,
			stageVisa: false,
		})
	}




	render = () => {
		const {stageSelection, stageVisa} = this.state
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
					<CardContent
						style={{minWidth:'20em'}}
					>
						<Grid container
							  direction="row"

						>

							<h1 style={{color:'#404040', }}>
								<Button
									disabled={stageSelection}
								>
									<Icon
										onClick={this.handleGoBackButton}
										style={stageSelection ? {display:"none"} : {display:"unset"}}
									>
										arrow_back
									</Icon>
								</Button>
								Payment
							</h1>
						</Grid>

						<Grid container
							  justify="center"
							  alignItems="center"
						>
							{stageVisa ?  (<VisaPayment />) : ""}

							{stageSelection ? (<PaymentSelection handleSelection={this.userSelection}/>) : ''}
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		)
	}
}