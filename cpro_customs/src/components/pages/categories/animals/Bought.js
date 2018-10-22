import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";

import PageTitle from "../PageTitle";



import {CURRENCIES} from "../../../../data/Currencies";
import {SPECIES} from "../../../../data/Species";
import AnimalSelectButton from "./AnimalSelectButton";


class Bought extends Component {
    state = {
        animals: [
            {kindSelected: false, kind: 'other', value: '', currency: 'NOK', amount: 0},
            {kindSelected: false, kind: 'other', value: '', currency: 'NOK', amount: 0},
            {kindSelected: false, kind: 'other', value: '', currency: 'NOK', amount: 0},
        ],
    };

    render = () => {
        const {animals} = this.state;
        return (
            <div>
                <PageTitle title={"I bought an animal abroad"}/>
                <Grid container direction={"column"} spacing={16}>
                    {this.drawAnimals()}
                    <Grid item>
                        <Grid container justify={"center"} alignItems={"center"}>
                            <Grid item xs={11}>
                                <Paper className={"cdp_paper_category_sub_selection"}>
                                    <span className={"cdp_dark_grey"}>TEST</span>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    };

    handleChange = name => event => {
        let animals = this.state.animals;
        animals[0][name] = event.target.value;
        this.setState({
            animals: animals,
        });
    };

    handleSelectKind = (kind) => {
        let animals = this.state.animals;
        animals[0].kindSelected = true;
        animals[0].kind = kind;
        this.setState({
            animals: animals,
        });
    };

    drawAnimals = () => {
        let {animals} = this.state;
        let arr = [];
        Object.keys(animals).forEach(key => {
            console.log(key);
            console.log(animals[key]);
            if (!animals[key].kindSelected) {
                arr.push(
                    <Grid item>
                        <Grid container justify={"center"} alignItems={"center"}>
                            <Grid item xs={11}>
                                <Paper className={"cdp_paper_category_sub_selection"}>
                                    <Grid container justify={"center"} alignItems={"center"}>
                                        <h3 className={"cdp_dark_grey"}>Which kind of animal did you buy?</h3>
                                    </Grid>
                                    <Grid container justify={"center"} alignItems={"center"} spacing={32}>
                                        <Grid item onClick={() => this.handleSelectKind("dog")}>
                                            <AnimalSelectButton text={"Dog"} icon={"dog"}/>
                                        </Grid>
                                        <Grid item onClick={() => this.handleSelectKind("horse")}>
                                            <AnimalSelectButton text={"Horse"} icon={"horse"}/>
                                        </Grid>
                                        <Grid item onClick={() => this.handleSelectKind("other")}>
                                            <AnimalSelectButton text={"Other"} icon={"other"}/>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            } else {
                arr.push(
                    <Grid item>
                        <Grid container justify={"center"} alignItems={"center"}>
                            <Grid item xs={11}>
                                <Paper className={"cdp_paper_category_sub_selection"}>
                                    <h2 className={"cdp_dark_grey"}>This is a paper</h2>
                                    <Grid container alignItems={"center"}>
                                        <Grid item xs={4}>
                                            <span className={"cdp_dark_grey"}>Kind of animal:</span>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id={"select-kind"}
                                                className={"cdp_input_field"}
                                                select
                                                value={animals[key].kind}
                                                onChange={this.handleChange('kind')}
                                                variant={"outlined"}
                                            >
                                                {SPECIES.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems={"center"}>
                                        <Grid item xs={4}>
                                            <span className={"cdp_dark_grey"}>Animal value:</span>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="outlined-value"
                                                placeholder={"0"}
                                                value={animals[key].value}
                                                onChange={this.handleChange('value')}
                                                variant="outlined"
                                                style={{paddingLeft: "8px"}}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id={"outlined-select-currency"}
                                                className={"cdp_input_field"}
                                                select
                                                label={"Currency"}
                                                value={animals[key].currency}
                                                onChange={this.handleChange('currency')}
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
                                    {
                                        animals[key].kind === "dog" || animals[key].kind === "other" ?
                                            <Grid container alignItems={"center"}>
                                                I Contacted the NFSA
                                            </Grid>
                                            :
                                            <Grid container alignItems={"center"}>
                                                I contacted the NFSA and am registered there
                                            </Grid>
                                    }
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            }
        });
        return arr;
    };
}

export default Bought;