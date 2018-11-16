import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from "immutability-helper";

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button/Button";

import AnimalSelectButton from "./AnimalSelectButton";
import HelpTip from "../../../HelpTip";
import ImgBadge from "../../../ImgBadge";
import {SPECIES} from "../../../../data/Species";
import {CURRENCIES} from "../../../../data/Currencies";
import {TOOL_TIP_TEXTS} from "../../../../data/ToolTipTexts";
import PlusMinusButtons from "../PlusMinusButtons";
import {GlobalState} from "../../../context/GlobalState";


class BoughtItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animal: this.props.animal,
            kindSelected: this.props.kindSelected,
        }
    }

    render() {
        const {animal, kindSelected} = this.state;
        return (
            <GlobalState.Consumer>
                {globalState => (
                    !kindSelected ?
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container justify={"center"} alignItems={"center"}>
                                <Grid item xs={12} className={"bought_paper_container"}>
                                    <Grid container alignItems={"center"} justify={"center"}>
                                        <Grid item xs={11}>
                                            <Paper className={"cdp_paper_category_sub_selection"}>
                                                <Grid container justify={"center"} alignItems={"center"}>
                                                    <h3 className={"cdp_dark_grey"}>Which kind of animal did you
                                                        buy?</h3>
                                                </Grid>
                                                <Grid container justify={"center"} alignItems={"center"}>
                                                    <Grid item xs={4}
                                                          onClick={() => this.handleSelectKind("dog")}>
                                                        <AnimalSelectButton text={"Dog"} icon={"dog"}/>
                                                    </Grid>
                                                    <Grid item xs={4}
                                                          onClick={() => this.handleSelectKind("horse")}>
                                                        <AnimalSelectButton text={"Horse"} icon={"horse"}/>
                                                    </Grid>
                                                    <Grid item xs={4}
                                                          onClick={() => this.handleSelectKind("other")}>
                                                        <AnimalSelectButton text={"Other"} icon={"other"}/>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container justify={"center"} alignItems={"center"}>
                                <Grid item xs={12} className={"bought_paper_container"}>
                                    <Grid container justify={"center"} alignItems={"center"} direction={"row"}>
                                        <Grid item xs={11}>
                                            <Paper className={"cdp_paper_category_sub_selection"}>
                                                <Grid container alignItems={"center"}
                                                      className={"cdp_sub_selection_max_width_grid_item"}>
                                                    {animal.id}
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        <span className={"cdp_dark_grey"}>Kind of animal:</span>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField
                                                            id={"select-kind"}
                                                            className={"cdp_input_field"}
                                                            select
                                                            value={animal.kind}
                                                            onChange={this.handleChange('kind')}
                                                            variant={"outlined"}
                                                        >
                                                            {SPECIES.map(option => (
                                                                <MenuItem key={option.value}
                                                                          value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems={"center"}>
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        <span className={"cdp_dark_grey"}>Animal value:</span>
                                                    </Grid>
                                                    <Grid item xs={3} sm={4} md={4}>
                                                        <TextField
                                                            id="outlined-value"
                                                            placeholder={"0"}
                                                            value={animal.value}
                                                            onChange={this.handleChange('value')}
                                                            variant="outlined"
                                                            style={{paddingLeft: "8px"}}
                                                            type={"number"}
                                                            onInput={(e)=>{
                                                                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,8)
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField
                                                            id={"outlined-select-currency"}
                                                            className={"cdp_input_field"}
                                                            select
                                                            label={"Currency"}
                                                            value={animal.currency}
                                                            onChange={this.handleChange('currency')}
                                                            variant={"outlined"}

                                                        >
                                                            {CURRENCIES.map(option => (
                                                                <MenuItem key={option.value}
                                                                          value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems={"center"}>
                                                    <Grid item xs={10}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={animal.contactedNFSA}
                                                                    onChange={() => this.handleCheckbox('contactedNFSA')}
                                                                    color="primary"
                                                                />
                                                            }
                                                            label="I contacted the NFSA (required)"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <HelpTip text={TOOL_TIP_TEXTS.animal.contactedNFSA}
                                                                 placement={"top"}/>
                                                    </Grid>
                                                </Grid>
                                                {
                                                    animal.kind === "horse" ?
                                                        [
                                                            <Grid container alignItems={"center"} key={0}>
                                                                <Grid item xs={10}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={animal.registeredAtNFSA}
                                                                                onChange={() => this.handleCheckbox('registeredAtNFSA')}
                                                                                color="primary"
                                                                            />
                                                                        }
                                                                        label="I am registered at the NFSA (required)"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <HelpTip
                                                                        text={TOOL_TIP_TEXTS.animal.registeredAtNFSA}
                                                                        placement={"top"}/>
                                                                </Grid>
                                                            </Grid>,
                                                            <Grid container alignItems={"center"} key={1}>
                                                                <Grid item xs={10}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={animal.horseHasOriginInEU}
                                                                                onChange={() => this.handleCheckbox('horseHasOriginInEU')}
                                                                                color="primary"
                                                                            />
                                                                        }
                                                                        label="I have proof that the horse of EU origin (optional)"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <HelpTip
                                                                        text={TOOL_TIP_TEXTS.animal.horseHasOriginInEU}
                                                                        placement={"top"}/>
                                                                </Grid>
                                                            </Grid>
                                                        ]
                                                        :
                                                        ""
                                                }
                                                {
                                                    animal.kind === "dog" ?
                                                        <Grid container alignItems={"center"}>
                                                            <Grid item xs={8}>
                                                                        <span className={"cdp_dark_grey"}>Note that there
                                                                            is a ban
                                                                            on
                                                                            certain breeds of dogs</span>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Button
                                                                    onClick={this.props.showInfoModal}
                                                                    role="button"
                                                                    type="submit"
                                                                    value="more info"
                                                                > More
                                                                    Info </Button>
                                                            </Grid>
                                                        </Grid>
                                                        :
                                                        ""
                                                }
                                                <Grid container justify={"center"} alignItems={"center"}>
                                                    <Grid item xs={6}>
                                                        <Grid container justify={"flex-start"}
                                                              alignItems={"center"}>
                                                            <ImgBadge
                                                                icon={animal.kind}
                                                                badgeContent={animal.amount}
                                                                color={"secondary"}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Grid container justify={"flex-end"}
                                                              alignItems={"center"}>
                                                            <PlusMinusButtons
                                                                handleDecrement={() => this.handleDecrement(globalState)}
                                                                handleIncrement={() => this.handleIncrement(globalState)}
                                                                disableMinusButton={animal.amount === 0}
                                                                disablePlusButton={
                                                                    animal.name === ''
                                                                    || animal.value === '' || animal.value === '0'
                                                                    || !animal.contactedNFSA
                                                                    || (animal.kind.localeCompare("horse") === 0 && !animal.registeredAtNFSA)
                                                                }
                                                                showPlusFiveButton={false}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                )}
            </GlobalState.Consumer>
        );
    }

    /**
     * Handles all checkbox clicks
     * @param name - the name of the checkbox boolean
     */
    handleCheckbox = (name) => {
        const animal = update(this.state.animal, {
            [name]: {$set: !this.state.animal[name]},
        });
        this.setState({
            animal: animal,
        });
    };
    /**
     * Handles changes to fields
     * @param name - the name of the field
     * @returns {Function}
     */
    handleChange = (name) => event => {
        const animal = update(this.state.animal, {
            [name]: {$set: event.target.value},
        });
        this.setState({
            animal: animal,
        });
    };
    /**
     * Handles the selection of the animal kind
     * @param key - the index of the animal
     * @param kind - the kind of the animal: "dog", "horse" or "other"
     */
    handleSelectKind = (kind) => {
        const animal = update(this.state.animal, {
            kind: {$set: kind},
        });
        this.setState({
            kindSelected: true,
            animal: animal,
        });

    };

    handleDecrement = (globalState) => {
        const {id, amount} = this.state.animal;
        if (amount <= 0) return;
        if (amount === 1 && id !== null) {
            // remove product from cart
            globalState.removeProduct(id);
            this.showRemovedNotification();
        } else {
            // update product in cart
            globalState.updateProduct(id, "amount", amount - 1);
            // and locally
            const updated = update(this.state.animal, {
                amount: {$set: amount - 1},
            });
            this.setState({
                animal: updated,
            });
            this.showRemovedNotification();
        }
    };

    handleIncrement = (globalState) => {
        const {id, kind, value, currency, amount, contactedNFSA, registeredAtNFSA, horseHasOriginInEU} = this.state.animal;
        if (amount === 0) {
            // this is the special case of the animal element not being in global state !
            // product is added to cart
            globalState.addBoughtAnimal(kind, value, currency, 1, contactedNFSA, registeredAtNFSA, horseHasOriginInEU);
            // reset state of this special "new animal"
            this.setState({
                kindSelected: false,
                animal: {
                    "kind": 'other',
                    "value": '',
                    "currency": currency,
                    "amount": 0,
                    "contactedNFSA": false,
                    "registeredAtNFSA": false,
                    "horseHasOriginInEU": false,
                },
            });
        } else {
            // product is updated in cart
            globalState.updateProduct(id, "amount", amount + 1);
            const animal = update(this.state.animal, {
                amount: {$set: amount + 1},
            });
            this.setState({
                animal: animal,
            });
        }
        this.showAddedNotification();
    };

    /**
     * Shows a notification stating that the animal has been added to cart
     */
    showAddedNotification() {
        const {animal} = this.state;
        this.props.showNotification("Added 1x " + animal.kind + " with value of " + animal.value
            + " " + animal.currency + " to your declaration list");
    }

    /**
     * Shows a notification stating that the amount of the animal has been decremented
     */
    showRemovedNotification() {
        const {animal} = this.state;
        this.props.showNotification("Removed 1x " + animal.kind + " with value of " + animal.value
            + " " + animal.currency + " from your declaration list");
    }
}

BoughtItem.propTypes = {
    animal: PropTypes.object,
    kindSelected: PropTypes.bool,
    showInfoModal: PropTypes.any,
    showNotification: PropTypes.any,
};

export default BoughtItem;

