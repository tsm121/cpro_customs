import React, {Component} from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";

import ImgBadge from "../../../ImgBadge";
import PlusMinusButtons from "../PlusMinusButtons";
import {GlobalState} from "../../../global_state/GlobalState";


class AlcoholItem extends Component {
    state = {
        productId: this.props.productId,
        amount: this.props.amount,
        pitcherValue: 0,
    };

    render = () => {
        const {value, icon, pitcher} = this.props;
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <Grid item xs={12} sm={12} md={12} style={{paddingBottom: "32px"}}>
                        <Grid container justify={"center"} alignItems={"center"}>
                            <Grid item xs={11} className={"cdp_sub_selection_max_width_grid_item"}>
                                <Paper className={"cdp_paper_category_sub_selection"}>
                                    <Grid container spacing={8} justify={"center"} alignItems={"center"}>
                                        {
                                            pitcher
                                                ?
                                                <Grid item xs={12}>
                                                    <Grid container>
                                                        <Grid item xs={0} sm={1} md={1}/>
                                                        <Grid item xs={12} sm={6} md={6}>
                                                            <Grid container>
                                                                <p className={"cdp_dark_grey"}>Other amount</p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                :
                                                ""
                                        }
                                        <Grid item xs={3} sm={5} md={5}>
                                            <Grid container justify={"center"} alignItems={"center"}>
                                                {
                                                    pitcher
                                                        ?
                                                        [
                                                            <Grid item xs={12} sm={3} md={2} key={0}>
                                                                <Grid container justify={"center"}
                                                                      alignItems={"center"}>
                                                                    <ImgBadge
                                                                        icon={"pitcher"}
                                                                        key={1}
                                                                        badgeContent={this.state.amount}
                                                                        color={"secondary"}
                                                                        style={{
                                                                            marginBottom: "-5px",
                                                                            marginTop: "-5px"
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>,
                                                            <Grid item xs={12} sm={6} md={4} key={1}>
                                                                <Grid container justify={"center"}
                                                                      alignItems={"center"}>
                                                                    <TextField
                                                                        id={"good_name"}
                                                                        key={2}
                                                                        value={this.state.pitcherValue}
                                                                        className={"cdp_input_field"}
                                                                        label={"Litre"}
                                                                    />
                                                                </Grid>
                                                            </Grid>,
                                                        ]
                                                        :
                                                        [
                                                            <Grid item xs={12} sm={4} md={3} key={2}>
                                                                <Grid container justify={"center"}
                                                                      alignItems={"center"}>
                                                                    <ImgBadge
                                                                        icon={icon}
                                                                        key={0}
                                                                        badgeContent={this.state.amount}
                                                                        color={"secondary"}
                                                                        style={{paddingBottom: "-10px"}}
                                                                    />
                                                                </Grid>
                                                            </Grid>,
                                                            <Grid item xs={12} sm={4} md={3} key={2}>
                                                                <Grid container justify={"center"}
                                                                      alignItems={"center"}>
                                                                    <h3 className="cdp_dark_grey" key={1}
                                                                        style={{paddingTop: "10px"}}>
                                                                        {value}l
                                                                    </h3>
                                                                </Grid>
                                                            </Grid>,
                                                        ]
                                                }
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={9} sm={7} md={7}>
                                            <PlusMinusButtons
                                                handleDecrement={this.handleDecrement.bind(this, globalState)}
                                                handleIncrement={this.handleIncrement.bind(this, globalState, 1)}
                                                handlePlusFive={this.handleIncrement.bind(this, globalState, 5)}
                                            />
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

    // TODO: add handler for pitcher value changes!


    /**
     * Decrements the amount
     * @param globalState
     */
    handleDecrement = (globalState) => {
        if (this.state.amount <= 0) {
            return;
        }
        const id = this.props.productId;
        // product is removed from cart
        if (this.state.amount === 1 && this.state.product !== null) {
            globalState.removeProduct(id);
            this.setState({
                amount: this.state.amount - 1,
                productId: null,
            });
        // product is updated in cart
        } else {
            globalState.updateProduct(id, "amount", this.state.amount - 1);
            this.setState({
                amount: this.state.amount - 1,
            });
        }
    };

    /**
     * Increments the amount
     * @param globalState
     * @param incr - how much shall the amount be incremented
     */
    handleIncrement = (globalState, incr) => {
        // product is added to cart
        if (this.state.amount === 0) {
            const id = globalState.addAlcohol(this.props.type, this.props.value, incr);
            this.setState({
                productId: id,
            });
        // product is updated in cart
        } else {
            const id = this.state.productId;
            globalState.updateProduct(id, "amount", this.state.amount + incr);
        }
        this.setState({
            amount: this.state.amount + incr,
        });
    };
}


AlcoholItem.propTypes = {
    product: PropTypes.object,
    value: PropTypes.number,
    icon: PropTypes.string,
    pitcher: PropTypes.bool,
    isInCart: PropTypes.bool,
    amount: PropTypes.number,
};

AlcoholItem.defaultProps = {
    pitcher: false,
    isInCart: false,
    amount: 0,
};

export default AlcoholItem;