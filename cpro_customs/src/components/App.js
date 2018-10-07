import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import theme from'../material-theme'

import './App.css';
import Header from './Header'
import Router from './Router'

/**
 * The entry point to the SPA
 */
class App extends Component {
	render() {
		return (
		    <div>
                <MuiThemeProvider theme={theme}>
                    {/* put components that shall be displayed on every page here */}
                    <Header/>
                    {/* handles dynamic component loading */}
                    <Router/>
                </MuiThemeProvider>
            </div>
		);
	}
}

export default withStyles()(App);
