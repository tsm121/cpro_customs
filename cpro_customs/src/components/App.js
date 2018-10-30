import React, {Component} from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';

import theme from '../material-theme'
import {GlobalState} from "./global_state/GlobalState";
import Header from './header/Header'
import Router from './Router'
import './App.css';


/**
 * The entry point to the SPA
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            amount_to_pay: 0,
            productIdCounter: 0,
        };
    }

    /*
     * bind the functions
     * TODO: This is necessary, but why?
     */
    addProduct = this.addProduct.bind(this);
    removeProduct = this.removeProduct.bind(this);
    addGood = this.addGood.bind(this);
    addAlcohol = this.addAlcohol.bind(this);
    getAlcohol = this.getAlcohol.bind(this);

    /**
     * Adds a product to products
     * @param product - the product to be added
     */
    addProduct(product) {
        product['id'] =  this.state.productIdCounter;
        this.setState({
            productIdCounter: product['id'] + 1,
            products: [...this.state.products, product]
        });
    }

    /**
     * Searches for product with id and removes it from products
     * @param id - the id of the product
     */
    removeProduct(id) {
        let {products} = this.state;
        for (let i = 0; i < products.length; ++i) {
            if (products[i].id === id) {
                products.splice(i, 1);
                break;
            }
        }
        this.setState({
            items: products,
        });
    }

    /**
     * Adds a Good to products
     * @param name - the name of the Good, e.g. "kitchen"
     * @param value - the value of the Good, e.g. 30000
     * @param currency - the currency of the value, e.g. "NOK"
     * @param amount - amount of items, e.g. 1
     */
    addGood(name, value, currency, amount) {
        let good = {
            "product": "Goods",
            "name": name,
            "value": value,
            "currency": currency,
            "amount": amount,
        };
        this.onAddToCart(good);
    }

    /**
     * Adds alcohol of specific type to products
     * @param type - type of alcohol, e.g. "lightBeer"
     * @param value - how many litres, e.g. 0.5
     * @param amount - amount of items, e.g. 6
     */
    addAlcohol(type, value, amount) {
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
     * @param category - type of alcohol, e.g. "lightBeer"
     * @param value - how many litres, e.g. 0.5
     * @param pitcher - boolean, true if its a pitcher item
     */
    getAlcohol(category, value, pitcher) {
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