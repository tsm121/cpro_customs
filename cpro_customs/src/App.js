import React, { Component } from 'react';
import './App.css';
import theme from'./material-theme'

import { MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import Header from './components/Header'
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";

class App extends Component {
	render() {
		return (

			<MuiThemeProvider theme={theme}>
				<Header/>
				<Welcome/>
				<Navigation/>
			</MuiThemeProvider>
		);
	}
}

export default withStyles()(App);
