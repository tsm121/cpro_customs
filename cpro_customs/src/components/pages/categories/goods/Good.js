import React, {Component} from 'react';
import update from "immutability-helper";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

import ImgBadge from "../../../ImgBadge";
import PlusMinusButtons from "../PlusMinusButtons";
import {CURRENCIES} from "../../../../data/Currencies";
import {GlobalState} from "../../../context/GlobalState";


class Good extends Component {
    state = {
        good: this.props.good,
        updateTriggered: false,
    };

    render = () => {
        const {good} = this.state;
        const {autoFocus} = this.props;

        return (
            <GlobalState.Consumer>
                {globalState => (
                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container justify={"center"} alignItems={"center"}>
                            <Grid item xs={12} className={"cdp_sub_selection_max_width_grid_item"}>
                                <Paper className={"cdp_paper_category_sub_selection"}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Grid container spacing={8}
                                                  ustify={"center"}
                                                  alignItems={"center"}
                                            >
                                                <Grid item xs={12} sm={4} md={5}>
                                                    <Grid container>
                                                        <Grid item xs={3} sm={3}>
                                                            <Grid container justify={"center"} alignItems={"center"}>
                                                                <ImgBadge icon={"archive"}
                                                                          badgeContent={good.amount}
                                                                          color={"secondary"}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={8} sm={9}
                                                        >
                                                            <TextField
                                                                id={"good_name"}
                                                                className={"cdp_input_field"}
                                                                label={"Name"}
                                                                value={good.name}
                                                                onChange={this.handleChange(globalState, 'name')}
                                                                variant={"outlined"}
                                                                autoFocus={autoFocus}
                                                                fullWidth={true}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={5} md={4}>
                                                    <Grid container justify={"center"} alignItems={"center"}
                                                          spacing={32}>
                                                        <Grid item xs={7} sm={6} md={7}>
                                                            <TextField
                                                                id={"good_value"}
                                                                className={"cdp_input_field"}
                                                                variant={"outlined"}
                                                                label={"Value"}
                                                                value={good.value}
                                                                onChange={this.handleChange(globalState, 'value')}
                                                                fullWidth={true}
                                                                type={"number"}
                                                                onInput={(e) => {
                                                                    e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 9)
                                                                }}
                                                                placeholder={"0"}
                                                                InputProps={{
                                                                    startAdornment: <InputAdornment
                                                                        position="start">$</InputAdornment>,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={5} sm={6} md={5}>
                                                            <TextField
                                                                id={"outlined-select-currency"}
                                                                className={"cdp_input_field"}
                                                                select
                                                                label={"Currency"}
                                                                fullWidth={true}
                                                                value={good.currency}
                                                                onChange={this.handleChange(globalState, 'currency')}
                                                                variant={"outlined"}
                                                            >
                                                                {CURRENCIES.map(option => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={3} md={3}>
                                                    <PlusMinusButtons
                                                        handleDecrement={() => this.handleDecrement(globalState)}
                                                        handleIncrement={() => this.handleIncrement(globalState, 1)}
                                                        handlePlusFive={() => this.handleIncrement(globalState, 5)}
                                                        disableMinusButton={good.amount === 0}
                                                        disablePlusButton={
                                                            good.name === ''
                                                            || good.value === ''
                                                            || good.value === '0'
                                                        }
                                                        disablePlusFiveButton={
                                                            good.name === ''
                                                            || good.value === ''
                                                            || good.value === '0'
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </GlobalState.Consumer>
        );
    };

    /**
     * Handles change of "name", "value" and "currency"
     * @param globalState
     * @param field - the field that will be changed
     * @return {Function}
     */
    handleChange = (globalState, field) => event => {
        const newValue = event.target.value;
        const oldGood = this.state.good;
        const {id, amount} = this.state.good;

        // change locally
        const good = update(this.state.good, {
            [field]: {$set: newValue},
        });
        this.setState({
            good: good,
        });

        // change globally
        if (amount > 0) {
            globalState.updateProduct(id, field, this.state.good[field]);
            if (!this.state.updateTriggered) {
                this.setState({
                    updateTriggered: true,
                });
                setTimeout(() => {
                        if (amount > 0) {
                            this.showUpdateNotification(oldGood);
                            this.setState({
                                updateTriggered: false,
                            });
                        }
                    }, 2000
                );
            }
        }
    };

    /**
     * Decrements the amount
     * @param globalState
     */
    handleDecrement(globalState) {
        const {id, amount} = this.state.good;
        if (amount <= 0) return;
        if (amount === 1 && id !== null) {
            // remove product from cart
            globalState.removeProduct(id);
            this.showDecrementNotification();
        } else {
            // update product in cart
            globalState.updateProduct(id, "amount", amount - 1);
            // and locally
            const good = update(this.state.good, {
                amount: {$set: amount - 1},
            });
            this.setState({
                good: good,
            });
            this.showDecrementNotification();
        }
    };

    /**
     * Increments the amount
     * @param globalState
     * @param incr - how much the amount is incremented
     */
    handleIncrement = (globalState, incr) => {
        const {id, name, value, currency, amount} = this.state.good;
        if (amount === 0) {
            // this is the special case of the good element not being in global state !
            // product is added to cart
            globalState.addGood(name, value, currency, incr);
            // reset state of this special "new good"
            this.setState({
                good: {
                    "name": '',
                    "value": '',
                    "currency": currency,
                    "amount": 0,
                },
            });
        } else {
            // product is updated in cart
            globalState.updateProduct(id, "amount", amount + incr);
            const good = update(this.state.good, {
                amount: {$set: amount + incr},
            });
            this.setState({
                good: good,
            });
        }
        this.showAddedNotification(incr);
    };

    /**
     * Shows a notification stating that the good has been added to cart
     * @param incr - how much amount was added
     */
    showAddedNotification(incr) {
        const {good} = this.state;
        this.props.showNotification("Added " + incr + "x " + good.name + " with value of " + good.value
            + " " + good.currency + " to your declaration list");
    };

    /**
     * Shows a notification stating that the amount of the good has been decremented
     */
    showDecrementNotification() {
        const {good} = this.state;
        this.props.showNotification("Removed 1x " + good.name + " with value of " + good.value
            + " " + good.currency + " from your declaration list");
    }

    /**
     * Shows a notification, stating that an item has been updated in cart
     * @param oldGood - the state of the good before update was initiated
     */
    showUpdateNotification = (oldGood) => {
        const {name, value, currency} = this.state.good;
        let message = "Changed " + oldGood.name + " " + oldGood.value + " " + oldGood.currency
            + " to " + name + " " + value + " " + currency + " in your declaration list";
        this.props.showNotification(message);
    }

}

Good.propTypes = {
    good: PropTypes.object,
    showNotification: PropTypes.any,
};

export default Good;