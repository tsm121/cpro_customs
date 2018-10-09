import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom';
import {Icon, Grid, Button, FormControl} from "@material-ui/core";

const styles = {
	nav_bottom: {
		position:'absolute',
		left:'0',
		bottom:'0',
		right:'0',
		paddingBottom: '1em',
	},
	nav_icon: {
		transform: 'scale(5)'
	}
};

const MyLink = props => <Link to="/persons-in-vehicle" {...props} />

class Navigation extends Component  {
	handleClick = () => {
        this.props.history.push("persons-in-vehicle");
    }

	render = () => {
		return (
			<FormControl fullWidth={true} root={true} style={styles.nav_bottom} onClick={this.routeChange}>
				<Grid container
					  spacing={0}
					  justify="center"
					  alignItems="center"
				>
					<Link to="/persons-in-vehicle" >Next Page with a Link</Link>
					<Button component={MyLink}>
						Next Page with a Button
					</Button>
					<Grid item xl onClick={this.handleClick}>
						<Icon style={styles.nav_icon}>
							keyboard_arrow_down
						</Icon>
					</Grid>

				</Grid>
			</FormControl>
		)
	}
}

export default withRouter(Navigation);

//for i in list
	//<komponent prop={i}/>