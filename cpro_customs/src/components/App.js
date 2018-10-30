import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
//import { withStyles } from '@material-ui/core/styles';
import { CartContext } from "./CartContext";

import theme from'../material-theme'

import './App.css';
import Header from './header/Header'
import Router from './Router'


let id = 0;
function createRows(category, filename, amount, unit, value, vat, duty) {
    id++;
    return {id, category, filename, amount, unit, value, vat, duty};
}

/**
 * The entry point to the SPA
 */
class App extends Component {
    state = {
        items: [
            createRows('Bought a dog abroad', 'dog_dark_grey', 2, "", 18000, 4500, 0)
        ]
    };

    onAddToCart = this.onAddToCart.bind(this);
    onAddToCart(p) {
        this.setState({
            items: [...this.state.items, p]
        });
    }

    onRemoveFromCart = this.onRemoveFromCart.bind(this);
    onRemoveFromCart(i) {
        console.log("cart")
        const newArray = [...this.state.items];
        newArray.splice(i, 1);

        this.setState({
            items: newArray
        });
    }

	render() {
		return (
            <CartContext.Provider
                value={{
                    items: this.state.items,
                    onAddToCart: this.onAddToCart,
                    onRemoveFromCart: this.onRemoveFromCart
                }}
            >
		    <div>
                <MuiThemeProvider theme={theme}>
                    {/* put components that shall be displayed on every page here */}
                    <Header/>
                    {/* handles dynamic component loading */}
                    <Router/>
                </MuiThemeProvider>
            </div>
            </CartContext.Provider>
		);
	}
}

//export default withStyles()(App);
export default (App);