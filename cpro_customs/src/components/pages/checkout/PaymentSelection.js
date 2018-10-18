import {Component} from "react";
import React from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Icon} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';





export default class PaymentSelection extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			visa: false,
			mastercard: false,
			vipps: false,
			bitcoin: false,
		}
	}

	handleOnClickEvent = (id) => {
		switch (id) {
			default: {
				break
			}
			case "visa": {
				this.setState({
					visa: true,
					mastercard: false,
					vipps: false,
					bitcoin: false,
				})
				break
			}
			case "mastercard": {
				this.setState({
					visa: false,
					mastercard: true,
					vipps: false,
					bitcoin: false,
				})
				break
			}
			case "vipps": {
				this.setState({
					visa: false,
					mastercard: false,
					vipps: true,
					bitcoin: false,
				})
				break
			}
			case "bitcoin": {
				this.setState({
					visa: false,
					mastercard: false,
					vipps: false,
					bitcoin: true,
				})
				break
			}

		}
	}

	checkMark = () => {
		return <ListItemIcon>
			<Icon
				style={{color:"#4CBB17"}}>
				check
			</Icon>
		</ListItemIcon>
	}

	getSelected = () => {
		const {visa, mastercard, vipps, bitcoin} = this.state
		const {handleSelection} = this.props

		if(visa) handleSelection("visa")
		if(mastercard) handleSelection("mastercard")
		if(vipps) handleSelection("vipps")
		if(bitcoin) handleSelection("bitcoin")
		else {
			//TODO: Give the user a feedback that a selection need to be made
		}
	}

	render = () => {
		const {visa, mastercard, vipps, bitcoin} = this.state
		return (

			<Grid container
				  justify={"center"}
				  alignItems={"center"}
				  direction={"column"}
			>

				<Grid container
					  justify={"center"}
					  alignItems={"center"}
				>
					<Grid item xs={12}>
						<List component="nav">

							<Divider/>
							<ListItem button
									  onClick={() => this.handleOnClickEvent("visa")}
							>
								<ListItemAvatar>
									<Avatar
										src={require(`assets/img/icons/payment/visa.png`)}
										alt={"Visa"}
									>
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Visa" />
								{visa ? this.checkMark() : '' }
							</ListItem>
							<Divider/>
							<ListItem button
									  onClick={() => this.handleOnClickEvent("mastercard")}
							>
								<ListItemAvatar>
									<Avatar
										src={require(`assets/img/icons/payment/mastercard.png`)}
										alt={"MasterCard"}
									>
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="MasterCard" />
								{mastercard ? this.checkMark() : '' }
							</ListItem>
							<Divider/>
							<ListItem button
									  onClick={() => this.handleOnClickEvent("vipps")}
							>
								<ListItemAvatar>
									<Avatar
										src={require(`assets/img/icons/payment/vipps.png`)}
										alt={"Vipps"}
									>
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Vipps" />
								{vipps ? this.checkMark() : '' }
							</ListItem>
							<Divider/>
							<ListItem button
									  onClick={() => this.handleOnClickEvent("bitcoin")}
							>
								<ListItemAvatar>
									<Avatar
										src={require(`assets/img/icons/payment/bitcoin.png`)}
										alt={"Bitcoin"}
									>
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Bitcoin" />
								{bitcoin ? this.checkMark() : '' }
							</ListItem>

						</List>

						<List>
							<ListItem button style={{backgroundColor:"#ffd200"}}>
								<ListItemText
									style={{textAlign:"center", color:"#37424a"}}
									primary={"Next"}
									onClick={this.getSelected}
								/>
							</ListItem>
						</List>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}