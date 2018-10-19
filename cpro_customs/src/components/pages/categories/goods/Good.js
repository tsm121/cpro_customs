import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import ImgBadge from "../../../ImgBadge";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from "@material-ui/core/Button/Button";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


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
    };

    render = () => {
        const {currency} = this.state;
        const {autoFocus} = this.props;

        return (
            <Grid item xs={12} sm={11} md={11} className={"cdp_sub_selection_max_width_grid_item"}>
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item xs={11}>
                        <Paper className={"cdp_paper_category_sub_selection"}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container spacing={8} justify={"center"} alignItems={"center"}>
                                        <Grid item xs={12} sm={5} md={3}>
                                            <Grid container>
                                                <Grid item xs={3}>
                                                    <Grid container justify={"center"} alignItems={"center"}>
                                                        <ImgBadge icon={"archive"} badgeContent={0}
                                                                  color={"secondary"}/>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={9}>
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
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Grid container justify={"center"} alignItems={"center"} spacing={32}>
                                                <Grid item xs={7} sm={6} md={6}>
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
                                                <Grid item xs={5} sm={6} md={6}>
                                                    <TextField
                                                        id={"outlined-select-currency"}
                                                        className={"cdp_input_field"}
                                                        select
                                                        label={"Currency"}
                                                        fullWidth={true}
                                                        value={currency}
                                                        onChange={this.changeCurrency('currency')}
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
                                        <Grid item xs={12} sm={12} md={5}>
                                            <Grid container spacing={16} justify={"flex-end"} alignItems={"center"}>
                                                <Grid item>
                                                    <Button className={"cdp_button_round"} variant="fab"
                                                            color="secondary">
                                                        <RemoveIcon/><span className={"cdp_icon_round_label"}>1</span>
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button className={"cdp_button_round"} variant="fab"
                                                            color="secondary">
                                                        <AddIcon/><span className={"cdp_icon_round_label"}>1</span>
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button className={"cdp_button_round"} variant="fab"
                                                            color="secondary">
                                                        <AddIcon/><span className={"cdp_icon_round_label"}>5</span>
                                                    </Button>
                                                </Grid>
                                            </Grid>
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

    changeCurrency = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

}

export default Good;