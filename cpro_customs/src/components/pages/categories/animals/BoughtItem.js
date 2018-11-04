import React, {Component} from 'react';
import PropTypes from 'prop-types';

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


class BoughtItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animal: this.props.animal,
        }
    }

    render() {
        const {animal} = this.state;
        return (
            <div>
                {
                    !animal.kindSelected ?
                        <Grid item>
                            <Grid container justify={"center"} alignItems={"center"}>
                                <Grid item className={"bought_paper_container"}>
                                    <Grid container alignItems={"center"} justify={"center"}>
                                        <Grid item xs={11}>
                                            <Paper className={"cdp_paper_category_sub_selection"}>
                                                <Grid container justify={"center"} alignItems={"center"}>
                                                    <h3 className={"cdp_dark_grey"}>Which kind of animal did you
                                                        buy?</h3>
                                                </Grid>
                                                <Grid container justify={"center"} alignItems={"center"}>
                                                    <Grid item xs={4} onClick={() => this.handleSelectKind("dog")}>
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
                        <Grid item>
                            <Grid container justify={"center"}
                                  alignItems={"center"}>
                                <Grid item className={"bought_paper_container"}>
                                    <Grid container justify={"center"} alignItems={"center"} direction={"row"}>
                                        <Grid item xs={11}>
                                            <Paper className={"cdp_paper_category_sub_selection"}>
                                                <Grid container alignItems={"center"}
                                                      className={"cdp_sub_selection_max_width_grid_item"}>
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
                                                                <MenuItem key={option.value} value={option.value}>
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
                                                                <MenuItem key={option.value} value={option.value}>
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
                                                            <Grid container alignItems={"center"}>
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
                                                            <Grid container alignItems={"center"}>
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
                                                                <p className={"cdp_dark_grey"}>Note that there is a ban
                                                                    on
                                                                    certain breeds of dogs</p>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Button onClick={this.props.showInfoModal}> More
                                                                    Info </Button>
                                                            </Grid>
                                                        </Grid>
                                                        :
                                                        ""
                                                }
                                                <Grid container>
                                                    <Grid item>
                                                        <Grid container justify={"flex-start"} alignItems={"center"}>
                                                            <ImgBadge
                                                                icon={animal.kind}
                                                                badgeContent={animal.amount}
                                                                color={"secondary"}
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
                }
            </div>
        );
    }

    /**
     * Handles all checkbox clicks
     * @param name - the name of the checkbox boolean
     */
    handleCheckbox = (name) => {
        let animal = this.state.animal;
        animal[name] = !animal[name];
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
        let animal = this.state.animal;
        animal[name] = event.target.value;
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
        let animal = this.state.animal;
        animal.kindSelected = true;
        animal.kind = kind;
        this.setState({
            animal: animal,
        });

    };
}

BoughtItem.propTypes = {
    animal: PropTypes.object,
    showInfoModal: PropTypes.any,
};

export default BoughtItem;

