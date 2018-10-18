import {Component} from "react";
import React from "react";

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import {Icon} from "@material-ui/core";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";



const styles = theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
	},
	wrapper: {
		margin: theme.spacing.unit,
		position: 'relative',
	},
	buttonSuccess: {
		backgroundColor: "green",
		'&:hover': {
			backgroundColor: "green",
		},
	},
	fabProgress: {
		color: "green",
		position: 'absolute',
		top: -6,
		left: -6,
		zIndex: 1,
	},
	buttonProgress: {
		color: "green",
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	loadingButton: {
	}
});

export default class HandlePayment extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			success: false,
		}
	}


	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	handleButtonClick = () => {
		const {paymentComplete} = this.props
		if (!this.state.loading) {
			this.setState(
				{
					success: false,
					loading: true,
				},
				() => {
					this.timer = setTimeout(() => {
						this.setState({
							loading: false,
							success: true,
						});
					}, 2500);
				},
			);
		}

		this.timer = setTimeout(() => {
			paymentComplete()
		}, 4000);
	};
	render = () => {

		const {loading, success} = this.state
		const {totalSum, selectedCurrency} = this.props
		return (

			<Grid container
				  direction={"row"}
				  justify={"center"}
				  alignItems={"center"}
				  style={{marginTop: "2em"}}
			>
				<Grid item xs={12}>
					<Grid container
						  direction={"row"}
						  justify={"center"}
						  alignItems={"center"}
					>
						<Button
							disabled={true}
							variant="fab"
							color="primary"
							style={Object.assign(
								loading ? {display:"none"} : {display:"unset"},
								success ? {backgroundColor:"#4CBB17"} : {display:"none"})}
						>
							{success ?
								<Icon style={{color:"white", fontSize:"2.5rem"}}>
									check
								</Icon>
								:
								<Icon>
									error
								</Icon>}
						</Button>
						{loading &&
						<CircularProgress
							size={68}
							style={{color:"#4CBB17"}}
						/>}
					</Grid>

					<List
						style={loading || success ? {display:"none"} : {display:"unset"}}
					>
						<ListItem button
								  style={{backgroundColor:"#ffd200"}}
						>
							<ListItemText
								style={Object.assign(
									{textAlign:"center", color:"#37424a"})}
								primary={"Pay (" + totalSum + " " + selectedCurrency +")"}
								onClick={this.handleButtonClick}
							/>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		)
	}
}