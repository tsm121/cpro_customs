import React, {Component} from 'react';

import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

import ImgBadge from "../../../ImgBadge";
import PlusMinusButtons from "../PlusMinusButtons";

import {CURRENCIES} from "../../../../data/Currencies";
import {GlobalState} from "../../../context/GlobalState";
import update from "immutability-helper";


class Good extends Component {
    state = {
        good: this.props.good,
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
                                                    {good.id}
                                                    <PlusMinusButtons
                                                        handleDecrement={() => this.handleDecrement(globalState)}
                                                        handleIncrement={() => this.handleIncrement(globalState, 1)}
                                                        handlePlusFive={() => this.handleIncrement(globalState, 5)}
                                                        disableMinusButton={good.amount === 0}
                                                        disablePlusButton={
                                                            good.name.localeCompare('') === 0
                                                            || good.value.localeCompare('') === 0
                                                            || good.value.localeCompare('0') === 0
                                                        }
                                                        disablePlusFiveButton={
                                                            good.name.localeCompare('') === 0
                                                            || good.value.localeCompare('') === 0
                                                            || good.value.localeCompare('0') === 0
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
     * @param name
     * @return {Function}
     */
    handleChange = (globalState, name) => event => {
        const value = event.target.value;
        const good = update(this.state.good, {
            [name]: {$set: value},
        });
        this.setState({
            good: good,
        });
    };

    /**
     * Decrements the amount
     * @param globalState
     */
    handleDecrement(globalState) {
        const {id, name, value, amount, currency} = this.state.good;
        if (amount <= 0) return;
        if (amount === 1 && id !== null) {
            // remove product from cart
            globalState.removeProduct(id);
        } else {
            // update product in cart
            globalState.updateProduct(id, "amount", amount - 1);
            const good = update(this.state.good, {
                amount: {$set: amount - 1},
            });
            this.setState({
                good: good,
            });
        }
    };

    /**
     * Increments the amount
     * @param globalState
     * @param incr - how much the amount is incremented
     */
    handleIncrement = (globalState, incr) => {
        const {name, value, currency, amount} = this.state.good;
        let id = this.state.good.id;
        if (amount === 0) {
            // product is added to cart
            id = globalState.addGood(name, value, currency, incr);
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

    showAddedNotification(incr) {
        const {good} = this.state;
        this.props.showNotification("Added " + incr + "x " + good.name + " with value of " + good.value
            + " " + good.currency + " to your declaration list");
    };

}

export default Good;