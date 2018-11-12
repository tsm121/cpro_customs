import React, {Component} from 'react';
import update from 'immutability-helper';

import {MuiThemeProvider} from '@material-ui/core/styles';

import theme from '../material-theme'
import {GlobalState} from "./context/GlobalState";
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
            overADay: false,
        };
    }

    /*
     * bind functions to be able to change the App.js state
     */
    totalAmount = this.totalAmount.bind(this);
    findProductIndexById = this.findProductIndexById.bind(this);
    removeAllElementsOfType = this.removeAllElementsOfType.bind(this);
    addProduct = this.addProduct.bind(this);
    updateProduct = this.updateProduct.bind(this);
    getProduct = this.getProduct.bind(this);
    removeProduct = this.removeProduct.bind(this);
    addGood = this.addGood.bind(this);
    getGoods = this.getGoods.bind(this);
    addBoughtAnimal = this.addBoughtAnimal.bind(this);
    getBoughtAnimals = this.getBoughtAnimals.bind(this);
    addAlcoholOrTobacco = this.addAlcoholOrTobacco.bind(this);
    getAlcoholOrTobacco = this.getAlcoholOrTobacco.bind(this);
    setOverADay = this.setOverADay.bind(this);
    setAmountToPay = this.setAmountToPay.bind(this);


    /**
     * Counts the total amount of items
     * @return {number}
     */
    totalAmount() {
        const {products} = this.state;
        let amount = 0;
        for (let i = 0; i < products.length; ++i) {
            amount += products[i].amount;
        }
        return amount;
    }

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
        if (id === undefined || id === null) throw "id undefined or null";
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
            "type": "Goods",
            "name": name,
            "value": value,
            "currency": currency,
            "amount": amount,
            "icon": "good",
        };
        return this.addProduct(good);
    }

    /**
     * Returns all goods
     */
    getGoods() {
        const {products} = this.state;
        let goods = [];
        for (let i = 0; i < products.length; ++i) {
            if (products[i].type.localeCompare('Goods') === 0) {
                goods.push(products[i]);
            }
        }
        return goods;
    }

    /**
     * TODO add docu
     * @param kind
     * @param value
     * @param currency
     * @param amount
     * @param contactedNFSA
     * @param registeredAtNFSA
     * @param horseHasOriginInEU
     * @return {*|the}
     */
    addBoughtAnimal(kind, value, currency, amount, contactedNFSA, registeredAtNFSA, horseHasOriginInEU) {
        let animal = {
            "type": "Bought Animal",
            "kind": kind,
            "value": value,
            "currency": currency,
            "amount": amount,
            "contactedNFSA": contactedNFSA,
            "registeredAtNFSA": registeredAtNFSA,
            "horseHasOriginInEU": horseHasOriginInEU,
            "icon": kind.localeCompare("other") === 0 ? "animal" : kind,
        };
        return this.addProduct(animal);
    }

    /**
     * Returns all bought animals
     */
    getBoughtAnimals() {
        const {products} = this.state;
        let boughtAnimals = [];
        for (let i = 0; i < products.length; ++i) {
            if (products[i].type.localeCompare('Bought Animal') === 0) {
                boughtAnimals.push(products[i]);
            }
        }
        return boughtAnimals;
    }

    /**
     * Adds alcohol/tobacco of specific type to products
     * @param unit - either "litres" or "pieces"
     * @param type - type of alcohol/tobacco, e.g. "Beer" or "Cigarettes"
     * @param value - how many pieces/litres per item, e.g. 20 or 0.5
     * @param amount - amount of items, e.g. 3
     * @param isOtherAmount - true, if user can choose the value himself
     * @param icon - the icon name
     * @return the id of the product
     */
    addAlcoholOrTobacco(unit, type, value, amount, isOtherAmount, icon) {
        let item = {
            "unit": unit,
            "type": type,
            "value": value,
            "amount": amount,
            "isOtherAmount": isOtherAmount,
            "icon": icon,
        };
        return this.addProduct(item);
    }

    /**
     * Searches for an alcohol item in the global state
     * @param type - type of alcohol/tobacco, e.g. "Beer" or "Cigarettes"
     * @param value - how many litres, e.g. 0.5 or 20
     * @param isOtherAmount - boolean, true if its a other amount item
     */
    getAlcoholOrTobacco(type, value, isOtherAmount) {
        const {products} = this.state;
        if (isOtherAmount) {
            for (let i = 0; i < products.length; ++i) {
                if (products[i].type.localeCompare(type) === 0 && products[i].isOtherAmount) {
                    return products[i];
                }
            }
        } else {
            for (let i = 0; i < products.length; ++i) {
                if (products[i].type.localeCompare(type) === 0 && products[i].value === value) {
                    return products[i];
                }
            }
        }
        return null;
    }

    /**
     * Removes all products of a certain type
     * @param type - the product type, e.g. "Beer"
     */
    removeAllElementsOfType(type) {
        let {products} = this.state;
        for (let i = 0; i < products.length; ++i) {
            if (products[i].type.localeCompare(type) === 0) {
                products.splice(i, 1);
            }
        }
    }

    setOverADay() {
        this.setState({
            overADay: true
        })
    }

    setAmountToPay(toPay){
        this.setState({
            amount_to_pay: toPay
        })
    }

    render() {
        return (
            <GlobalState.Provider
                /*
                    provide state and functions
                 */
                value={{
                    products: this.state.products,
                    amount_to_pay: this.state.amount_to_pay,
                    overADay: this.state.overADay,
                    totalAmount: this.totalAmount,
                    findProductIndexById: this.findProductIndexById,
                    removeAllElementsOfType: this.removeAllElementsOfType,
                    addProduct: this.addProduct,
                    updateProduct: this.updateProduct,
                    getProduct: this.getProduct,
                    removeProduct: this.removeProduct,
                    addGood: this.addGood,
                    getGoods: this.getGoods,
                    addBoughtAnimal: this.addBoughtAnimal,
                    getBoughtAnimals: this.getBoughtAnimals,
                    addAlcoholOrTobacco: this.addAlcoholOrTobacco,
                    getAlcoholOrTobacco: this.getAlcoholOrTobacco,
                    setOverADay: this.setOverADay,
                    setAmountToPay: this.setAmountToPay,
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