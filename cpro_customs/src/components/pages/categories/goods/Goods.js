import React, {Component} from "react";

import PageTitle from "../PageTitle";

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";

import "../../../App.css"
import ImgBadge from "../../../ImgBadge";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";


const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];


class Goods extends Component {
    state = {
        name: '',
        age: '',
        currency: 'KR',
    };

    render = () => {
        const { currency } = this.state;
        return (
            <div>
                <PageTitle title={"Goods"}/>
                <Grid container
                      justify={"center"}
                      direction={"row"}>
                    <Grid item xs={11} sm={11} md={11}>
                        <Paper className={"cdp_paper_category_sub_selection"}>
                            <Grid container alignItems={"space-evenly"}>
                                <Grid item>
                                    <ImgBadge icon={"archive"} badgeContent={0} color={"secondary"}/>
                                    <TextField
                                        id="good_name"
                                        label="Name"
                                        margin={"normal"}
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="outlined-adornment-amount"
                                        variant="outlined"
                                        label="Amount"
                                        placeholder={0}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        margin={"normal"}
                                    />
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Currency"
                                        value={currency}
                                        margin={"normal"}
                                        variant="outlined"
                                    >
                                        {currencies.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Goods.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default Goods;