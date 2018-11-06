import React, {Component} from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';

import theme from '../material-theme'

import {GlobalState} from "./global_state/GlobalState";
import './App.css';
import Header from './header/Header'
import Router from './Router'


let productId = 0;

/**
 * The entry point to the SPA
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            amount_to_pay: 0,
        };
    }

    onAddToCart = this.onAddToCart.bind(this);
    onAddToCart(p) {
        p['id'] = productId++;
        this.setState({
            products: [...this.state.products, p]
        });
    }

    removeProductFromCart = this.removeProductFromCart.bind(this);
    removeProductFromCart(id) {
        const {products} = this.state;
        // TODO: delete product with this id from products
        this.setState({
            items: products
        });
    }

    addGoodToCart = this.addGoodToCart.bind(this);
    addGoodToCart(name, value, currency, amount) {
        let good = {
            "product": "Goods",
            "name": name,
            "value": value,
            "currency": currency,
            "amount": amount,
        };
        this.onAddToCart(good);
    }

    addAlcoholToCart = this.addAlcoholToCart.bind(this);
    addAlcoholToCart(type, value, amount) {
        let item = {
            "product": type,
            "value": value,
            "unit": "litre",
            "amount": amount,
        };
        this.onAddToCart(item);
    }

    /**
     * Searches for an alcohol item in the global state
     */
    getAlcoholFromCart = this.getAlcoholFromCart.bind(this);
    getAlcoholFromCart(category, value, pitcher) {
        const {products} = this.state;
        if (pitcher) {
            products.forEach((item) => {
                if (item.product === category && item.pitcher) {
                    return item;
                }
            });
        } else {
            products.forEach((item) => {
                if (item.product === category && item.value === value) {
                    return item;
                }
            });
        }
        return null;
    }


    render() {
        return (
            <GlobalState.Provider
                value={{
                    products: this.state.products,
                    amount_to_pay: this.state.amount_to_pay,
                    onAddToCart: this.onAddToCart,
                    onRemoveFromCart: this.onRemoveFromCart,
                    addGoodToCart: this.addGoodToCart,
                    getAlcoholFromCart: this.getAlcoholFromCart,
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
            </GlobalState.Provider>
        );
    }
}

export default (App);