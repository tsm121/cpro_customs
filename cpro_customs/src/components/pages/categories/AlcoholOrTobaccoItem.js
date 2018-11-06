import React, {Component} from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";

import ImgBadge from "../../ImgBadge";
import PlusMinusButtons from "./PlusMinusButtons";
import {GlobalState} from "../../context/GlobalState";


class AlcoholOrTobaccoItem extends Component {
    state = {
        productId: this.props.productId,
        amount: this.props.amount,
        value: this.props.value,
        updateTriggered: false,
    };

    render = () => {
        const {value, icon, isOtherAmount} = this.props;
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <Grid item xs={12} sm={12} md={12} style={{paddingBottom: "32px"}}>
                        <Grid container justify={"center"} alignItems={"center"}>
                            <Grid item xs={11} className={"cdp_sub_selection_max_width_grid_item"}>
                                <Paper className={"cdp_paper_category_sub_selection"}>
                                    <Grid container spacing={8} justify={"center"} alignItems={"center"}>
                                        {
                                            isOtherAmount
                                                ?
                                                <Grid item xs={12}>
                                                    <Grid container>
                                                        <Grid item sm={1} md={1}/>
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
                                                    isOtherAmount
                                                        ?
                                                        [
                                                            <Grid item xs={12} sm={3} md={2} key={0}>
                                                                <Grid container justify={"center"}
                                                                      alignItems={"center"}>
                                                                    <ImgBadge
                                                                        icon={icon}
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
                                                                        value={this.state.value}
                                                                        onChange={(e) => this.handlePitcherValueChange(globalState, e)}
                                                                        className={"cdp_input_field"}
                                                                        label={this.props.unit.toLocaleLowerCase()}
                                                                    />
                                                                </Grid>
                                                            </Grid>,
                                                        ]
                                                        :
                                                        [
                                                            <Grid item xs={12} sm={4} md={3} key={0}>
                                                                <Grid container justify={"center"}
                                                                      alignItems={"center"}>
                                                                    <ImgBadge
                                                                        icon={icon}
                                                                        badgeContent={this.state.amount}
                                                                        color={"secondary"}
                                                                        style={{paddingBottom: "-10px"}}
                                                                    />
                                                                </Grid>
                                                            </Grid>,
                                                            <Grid item xs={12} sm={4} md={3} key={1}>
                                                                <Grid container justify={"center"}
                                                                      alignItems={"center"}>
                                                                    <h3 className="cdp_dark_grey"
                                                                        style={{paddingTop: "10px"}}>
                                                                        {value} {this.props.unit}
                                                                    </h3>
                                                                </Grid>
                                                            </Grid>,
                                                        ]
                                                }
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={9} sm={7} md={7}>
                                            <PlusMinusButtons
                                                handleDecrement={() => this.handleDecrement(globalState)}
                                                handleIncrement={() => this.handleIncrement(globalState, 1)}
                                                handlePlusFive={() => this.handleIncrement(globalState, 5)}
                                                disableMinusButton={this.state.amount === 0}
                                                disablePlusButton={this.props.isOtherAmount && this.state.value === ''}
                                                disablePlusFiveButton={this.props.isOtherAmount && this.state.value === ''}
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

    /**
     * Handles pitcher value change. Updates local and global state
     * @param globalState
     * @param event - the event containing the value
     */
    handlePitcherValueChange = (globalState, event) => {
        const value = event.target.value;
        const old = this.state.value;

        // value has been removed completely
        if (value.localeCompare('') === 0) {
            this.setState({
                value: '',
            });
            const id = this.state.productId;
            if (id !== null) {
                const notificationValue = globalState.getProduct(id).value;
                globalState.removeProduct(id);
                this.setState({
                    amount: 0,
                });
                this.showRemovedNotificationWithValue(notificationValue);
            }
            return;
        }

        // value has been changed
        // change local state
        this.setState({
            value: value,
        });
        // change global
        if (this.state.amount > 0 && !this.state.updateTriggered) {
            this.setState({
                updateTriggered: true,
            });
            setTimeout(() => {
                    if (this.state.amount > 0) {
                        const id = this.state.productId;
                        globalState.updateProduct(id, "value", this.state.value);
                        this.showUpdateNotification(old, this.state.value);
                        this.setState({
                            updateTriggered: false,
                        });
                    }
                }, 2000
            );
        }
    };

    /**
     * Decrements the amount
     * @param globalState
     */
    handleDecrement = (globalState) => {
        if (this.state.amount <= 0) {
            return;
        }
        this.showRemovedNotification();
        const id = this.state.productId;
        if (this.state.amount === 1 && this.state.product !== null) {
            // remove product from cart
            globalState.removeProduct(id);
            this.setState({
                amount: this.state.amount - 1,
                productId: null,
            });
            if (this.props.isOtherAmount) {
                this.setState({
                    value: '',
                    updateTriggered: false,
                });
            }
        } else {
            // update product in cart
            globalState.updateProduct(id, "amount", this.state.amount - 1);
            this.setState({
                amount: this.state.amount - 1,
            });
        }
    };

    /**
     * Increments the amount
     * @param globalState
     * @param incr - how much the amount is incremented
     */
    handleIncrement = (globalState, incr) => {
        if (this.state.value === '') return;
        this.showAddedNotification(incr);
        // product is added to cart
        if (this.state.amount === 0) {
            const id = globalState.addAlcoholOrTobacco(this.props.unit, this.props.type, this.state.value, incr, this.props.isOtherAmount, this.props.icon);
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

    /**
     * Shows a notification, stating that items as been added to cart
     * @param incr - the amount
     */
    showAddedNotification = (incr) => {
        this.props.showNotification("Added " + incr + "x " + this.state.value + " " + this.props.unit + " of "
            + this.props.type.toLocaleLowerCase() + " to your declaration list");
    };

    /**
     * Shows a notification, stating that an item has been removed from cart
     */
    showRemovedNotification = () => {
        this.props.showNotification("Removed 1x " + this.state.value + " " + this.props.unit + " of "
            + this.props.type.toLocaleLowerCase() + " from your declaration list");
    };

    /**
     * Shows a notification, stating that an item has been removed from cart
     * @param value - the value
     */
    showRemovedNotificationWithValue = (value) => {
        this.props.showNotification("Removed 1x " + value + " " + this.props.unit + " of "
            + this.props.type.toLocaleLowerCase() + " from your declaration list");
    };

    /**
     * Shows a notification, stating that an item has been updated in cart
     * @param oldValue - the old value
     * @param newValue - the new value
     */
    showUpdateNotification = (oldValue, newValue) => {
        this.props.showNotification("Updated " + this.props.type.toLocaleLowerCase() + " from " + oldValue + " "
            + this.props.unit +  " to " + newValue + " " + this.props.unit + " in your declaration list");
    }

}


AlcoholOrTobaccoItem.propTypes = {
    product: PropTypes.object,
    value: PropTypes.any,
    icon: PropTypes.string,
    isOtherAmount: PropTypes.bool,
    amount: PropTypes.number,
};

AlcoholOrTobaccoItem.defaultProps = {
    isOtherAmount: false,
    amount: 0,
};

export default AlcoholOrTobaccoItem;