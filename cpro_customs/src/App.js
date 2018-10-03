import React, { Component } from 'react';
import './App.css';
import Theme from'./material-theme'

import Header from './components/Header'
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Welcome from "./components/Welcome";

class App extends Component {
	render() {
		return (

			<MuiThemeProvider theme={Theme}>
				<Header/>
				<Welcome/>
			</MuiThemeProvider>
		);
	}
}

export default withStyles()(App);
