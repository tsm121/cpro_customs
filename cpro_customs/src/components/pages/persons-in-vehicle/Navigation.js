import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import {Icon, Grid, Button, FormControl} from "@material-ui/core";

import './Navigation.css'
import Paper from "@material-ui/core/Paper/Paper";

class Navigation extends Component  {
	handleClick = () => {
        this.props.history.push("persons-in-vehicle");
    }

	render = () => {
		return (
			<Grid container
				  spacing={0}
				  justify="center"
				  alignItems="center"
				  direction="row"
				  className="personContainer"
			>
				<Grid item xs={11} sm={8} md={7} xl={6}>
					<Paper className="personPaper">
						<Grid container className="nav_container" justify="center" spacing={0}>
							<Icon fontSize={"large"}>
								keyboard_arrow_right
							</Icon>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

export default withRouter(Navigation);