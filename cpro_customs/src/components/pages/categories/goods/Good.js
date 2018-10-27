import React, {Component} from 'react';

import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

import ImgBadge from "../../../ImgBadge";
import PlusMinusButtons from "../PlusMinusButtons";


const currencies = [
    {
        value: 'NOK',
        label: 'NOK',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'BTC',
        label: '฿',
    },
];


class Good extends Component {
    state = {
        name: '',
        age: '',
        currency: 'NOK',
        amount: 0,
    };

    render = () => {
        const {currency, amount} = this.state;
        const {autoFocus} = this.props;

        return (
            <Grid item xs={12} sm={12} md={12} >
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
                                                                  badgeContent={amount}
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
                                                        variant={"outlined"}
                                                        autoFocus={autoFocus}
                                                        fullWidth={true}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={4}>
                                            <Grid container justify={"center"} alignItems={"center"} spacing={32}>
                                                <Grid item xs={7} sm={6} md={7}>
                                                    <TextField
                                                        id={"good_value"}
                                                        className={"cdp_input_field"}
                                                        variant={"outlined"}
                                                        label={"Value"}
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
                                                        value={currency}
                                                        onChange={this.handleChangeCurrency('currency')}
                                                        variant={"outlined"}
                                                    >
                                                        {currencies.map(option => (
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
                                                handleDecrement={this.handleDecrement.bind(this)}
                                                handleIncrement={this.handleIncrement.bind(this)}
                                                handlePlusFive={this.handlePlusFive.bind(this)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    handleChangeCurrency = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleDecrement = () => {
        if (this.state.amount <= 0) return;
        this.setState({
            amount: this.state.amount - 1,
        });
    };

    handleIncrement = () => {
        this.setState({
            amount: this.state.amount + 1,
        });
    };

    handlePlusFive = () => {
        this.setState({
            amount: this.state.amount + 5,
        });
    };
}

export default Good;