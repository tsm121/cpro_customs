import React, {Component} from 'react';
import update from 'immutability-helper';

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

    only_for_testing() {
        this.addAlcohol("Beer", 0.5, 6);
    }

    /*
     * bind the functions
     * TODO: This is necessary, but why?
     */
    addProduct = this.addProduct.bind(this);
    updateProduct = this.updateProduct.bind(this);
    getProduct = this.getProduct.bind(this);
    removeProduct = this.removeProduct.bind(this);
    addGood = this.addGood.bind(this);
    addAlcohol = this.addAlcohol.bind(this);
    getAlcohol = this.getAlcohol.bind(this);
    only_for_testing = this.only_for_testing.bind(this);
    findProductIndexById = this.findProductIndexById.bind(this);

    /**
     * Adds a product to products
     * @param product - the product to be added
     * @return the id of the product
     */
    addProduct(product) {
        product['id'] = this.state.productIdCounter;
        this.setState({
            productIdCounter: product['id'] + 1,
            products: [...this.state.products, product]
        });
        return product['id'];
    }

    /**
     * Updates a specific field of a product
     * @param id - the id of the product
     * @param field - the field to be updated, e.g. "amount"
     * @param value - the new value
     */
    updateProduct(id, field, value) {
        let index = this.findProductIndexById(id);
        if (index === -1) return;
        const products = update(this.state.products, {
            [index]: {[field]: {$set: value}},
        });
        this.setState({
            products: products,
        });
    }

    /**
     * Returns a product
     * @param id - the id of the product
     * @returns the product object, if id is found, else null
     */
    getProduct(id) {
        let index = this.findProductIndexById(id);
        if (index === -1) return null;
        return this.state.products[index];
    }

    findProductIndexById(id) {
        const {products} = this.state;
        for (let i = 0; i < products.length; ++i) {
            if (products[i].id === id) {
                return i;
            }
        }
        return -1;
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
        this.addProduct(good);
    }

    /**
     * Adds alcohol of specific type to products
     * @param type - type of alcohol, e.g. "Beer"
     * @param liters - how many litres, e.g. 0.5
     * @param amount - amount of items, e.g. 6
     * @param isPitcher - true when pitcher
     * @return the id of the product
     */
    addAlcohol(type, liters, amount, isPitcher) {
        let item = {
            "product": type,
            "value": liters,
            "unit": "litre",
            "amount": amount,
            "isPitcher": isPitcher,
        };
        return this.addProduct(item);
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
            for (let i = 0; i < products.length; ++i) {
                if (products[i].product.localeCompare(category) === 0 && products[i].isPitcher) {
                    return products[i];
                }
            }
        } else {
            for (let i = 0; i < products.length; ++i) {
                if (products[i].product.localeCompare(category) === 0 && products[i].value === value) {
                    return products[i];
                }
            }
        }
        return null;
    }

    render() {
        return (
            <GlobalState.Provider
                value={{
                    products: this.state.products,
                    amount_to_pay: this.state.amount_to_pay,
                    addProduct: this.addProduct,
                    updateProduct: this.updateProduct,
                    getProduct: this.getProduct,
                    removeProduct: this.removeProduct,
                    addGood: this.addGood,
                    addAlcohol: this.addAlcohol,
                    getAlcohol: this.getAlcohol,
                    only_for_testing: this.only_for_testing,
                    findProductIndexById: this.findProductIndexById,
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