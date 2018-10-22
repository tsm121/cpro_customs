import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button/Button";

import PageTitle from "../PageTitle";

import {CURRENCIES} from "../../../../data/Currencies";
import {SPECIES} from "../../../../data/Species";
import AnimalSelectButton from "./AnimalSelectButton";


class Bought extends Component {
    state = {
        animals: [
            {
                kindSelected: false,
                kind: 'other',
                value: '',
                currency: 'NOK',
                amount: 0,
                contactedNFSA: false,
                registeredAtNFSA: false
            },
            {
                kindSelected: false,
                kind: 'other',
                value: '',
                currency: 'NOK',
                amount: 0,
                contactedNFSA: false,
                registeredAtNFSA: false
            },
            {
                kindSelected: false,
                kind: 'other',
                value: '',
                currency: 'NOK',
                amount: 0,
                contactedNFSA: false,
                registeredAtNFSA: false
            },
        ],
    };

    render = () => {
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
                                <Grid container alignItems={"center"} justify={"center"}>
                                    <Paper className={"cdp_paper_category_sub_selection"}>
                                        <Grid container justify={"center"} alignItems={"center"}>
                                            <h3 className={"cdp_dark_grey"}>Which kind of animal did you buy?</h3>
                                        </Grid>
                                        <Grid container justify={"center"} alignItems={"center"} spacing={32}>
                                            <Grid item onClick={() => this.handleSelectKind(key, "dog")}>
                                                <AnimalSelectButton text={"Dog"} icon={"dog"}/>
                                            </Grid>
                                            <Grid item onClick={() => this.handleSelectKind(key, "horse")}>
                                                <AnimalSelectButton text={"Horse"} icon={"horse"}/>
                                            </Grid>
                                            <Grid item onClick={() => this.handleSelectKind(key, "other")}>
                                                <AnimalSelectButton text={"Other"} icon={"other"}/>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            } else {
                arr.push(
                    <Grid item>
                        <Grid container justify={"center"}
                              alignItems={"center"}>
                            <Grid item xs={11}>
                                <Grid container justify={"center"} alignItems={"center"}>
                                    <Paper className={"cdp_paper_category_sub_selection"}>
                                        <Grid container alignItems={"center"}
                                              className={"cdp_sub_selection_max_width_grid_item"}>
                                            <Grid item xs={4} sm={3} md={2}>
                                                <span className={"cdp_dark_grey"}>Kind of animal:</span>
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    id={"select-kind"}
                                                    className={"cdp_input_field"}
                                                    select
                                                    value={animals[key].kind}
                                                    onChange={this.handleChange(key, 'kind')}
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
                                            <Grid item xs={4} sm={3} md={2}>
                                                <span className={"cdp_dark_grey"}>Animal value:</span>
                                            </Grid>
                                            <Grid item xs={3} sm={2} md={2}>
                                                <TextField
                                                    id="outlined-value"
                                                    placeholder={"0"}
                                                    value={animals[key].value}
                                                    onChange={this.handleChange(key, 'value')}
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
                                                    onChange={this.handleChange(key, 'currency')}
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
                                        <Grid container alignItems={"center"}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.animals[key].contactedNFSA}
                                                        onChange={() => this.handleCheckbox(key, 'contactedNFSA')}
                                                        color="primary"
                                                    />
                                                }
                                                label="I contacted the NFSA"
                                            />
                                        </Grid>
                                        {
                                            animals[key].kind === "horse" ?
                                                <Grid container alignItems={"center"}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={this.state.animals[key].registeredAtNFSA}
                                                                onChange={() => this.handleCheckbox(key, 'registeredAtNFSA')}
                                                                color="primary"
                                                            />
                                                        }
                                                        label="I am registered at the NFSA"
                                                    />
                                                </Grid>
                                                :
                                                ""
                                        }
                                        {
                                            animals[key].kind === "dog" ?
                                                <Grid container alignItems={"center"}>
                                                    <span className={"cdp_dark_grey"}>Note that there is a ban on certain breeds of dogs</span>
                                                    <Button> More Info </Button>
                                                </Grid>
                                                :
                                                ""
                                        }
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            }
        });
        return arr;
    };

    /**
     * Handles all checkbox clicks
     * @param key - the index of the animal
     * @param name - the name of the checkbox boolean
     */
    handleCheckbox = (key, name) => {
        let animals = this.state.animals;
        animals[key][name] = !animals[key][name];
        this.setState({
            animals: animals,
        });
    };

    /**
     * Handles changes to fields
     * @param key - the index of the animal
     * @param name - the name of the field
     * @returns {Function}
     */
    handleChange = (key, name) => event => {
        let animals = this.state.animals;
        animals[key][name] = event.target.value;
        this.setState({
            animals: animals,
        });
    };

    /**
     * Handles the selection of the animal kind
     * @param key - the index of the animal
     * @param kind - the kind of the animal: "dog", "horse" or "other"
     */
    handleSelectKind = (key, kind) => {
        let animals = this.state.animals;
        animals[key].kindSelected = true;
        animals[key].kind = kind;
        this.setState({
            animals: animals,
        });
    };
}

export default Bought;