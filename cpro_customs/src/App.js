import React, { Component } from 'react';
import './App.css';
import Theme from'./material-theme'

import Button from '@material-ui/core/Button';
import Header from './components/Header'
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

class App extends Component {
	render() {
		return (

			<MuiThemeProvider theme={Theme}>
				<Header/>
				<p>This is fsdfsadfasdfassome content</p>
				<Button variant="contained" color="secondary">
					Hello World
				</Button>
			</MuiThemeProvider>
		);
	}
}

export default withStyles()(App);
