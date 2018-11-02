import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import AlcoholItem from "./AlcoholItem";
import TollInfoBanner from "../TollInfoBanner";
import {GlobalState} from "../../../global_state/GlobalState";
import SnackBarNotification from "../../../SnackBarNotification";
import Button from "@material-ui/core/Button/Button";


class Beer extends Component {
    notificationQueue = [];

    constructor(props) {
        super(props);
        this.state = {
            openNotification: false,
            notificationMessage: "",
        };
        this.closeNotification = this.closeNotification.bind(this);
        this.exitNotification = this.exitNotification.bind(this);
        this.showNotification = this.showNotification.bind(this);
    }

    render = () => {
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <div>
                        <PageTitle title={"Beer"}/>
                        <Grid container
                              justify={"center"}
                              alignItems={"center"}
                              spacing={0}
                              direction={"row"}
                        >
                            <Grid item xs={12} sm={12} md={12}>
                                <Grid container justify={"center"} alignItems={"center"}>
                                    <Grid item xs={11} className={"cdp_sub_selection_max_width_grid_item"}>
                                        <Grid container>
                                            <Grid item xs={12}
                                                  style={{backgroundColor: "#e2e3e5", paddingLeft: "10px"}}>
                                                <Grid container justify={"flex-end"} alignItems={"flex-start"}>
                                                    <Button className={"cdp_yellow"} onClick={() => this.removeAllBeer(globalState)}>Clear</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <TollInfoBanner text={"7 NOK per bottle (0.33l) / 20 NOK per litre"}/>
                            {this.drawItems(globalState)}
                        </Grid>
                        <SnackBarNotification
                            open={this.state.openNotification}
                            message={this.state.notificationMessage}
                            onClose={this.closeNotification}
                            onExited={this.exitNotification}
                        />
                    </div>
                )}
            </GlobalState.Consumer>
        );
    };

    drawItems = (globalState) => {
        let options = [
            {category: "Beer", value: 0.33, isPitcher: false, icon: "beerCanSmall"},
            {category: "Beer", value: 0.5, isPitcher: false, icon: "beerCanBig"},
            {category: "Beer", value: '', isPitcher: true, icon: null},
        ];
        let items = [];
        for (let i = 0; i < options.length; ++i) {
            let product = globalState.getAlcohol(options[i].category, options[i].value, options[i].isPitcher);
            if (product !== null) {
                items.push(
                    <AlcoholItem
                        key={items.length}
                        type={"Beer"}
                        isPitcher={options[i].isPitcher}
                        icon={options[i].icon}
                        value={product !== null ? product.value : options[i].value}
                        amount={product.amount}
                        productId={product.id}
                        showNotification={this.showNotification}
                    />
                )
            } else {
                items.push(
                    <AlcoholItem
                        key={items.length}
                        type={"Beer"}
                        value={options[i].value}
                        isPitcher={options[i].isPitcher}
                        icon={options[i].icon}
                        amount={0}
                        showNotification={this.showNotification}
                    />
                )
            }
        }
        return items;
    };

    removeAllBeer = (globalState) => {
        // reset global state
        globalState.removeAllElementsOfType('Beer');
        this.forceUpdate();
    };

    /**
     * Handles show notification
     * @param message - the notification message being displayed
     * @return {Function}
     */
    showNotification = message => {
        // only show notification if the queue is not too full
        if (this.notificationQueue.length <= 1) {
            this.notificationQueue.push(message);
        }
        if (this.state.openNotification) {
            // immediately begin dismissing current message
            // to start showing new one
            this.setState({openNotification: false});
        } else {
            this.processQueue();
        }
    };

    /**
     * Handles close notification
     * @param event
     * @param reason
     */
    closeNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({openNotification: false});
    };

    /**
     * Handles exit snackbar notification
     */
    exitNotification = () => {
        this.processQueue();
    };


    /**
     * Shows next notification if there is one, else hides snackbar
     */
    processQueue = () => {
        if (this.notificationQueue.length > 0) {
            this.setState({
                notificationMessage: this.notificationQueue.shift(),
                openNotification: true,
            });
        } else {
            this.setState({openNotification: false});
        }
    };
}

export default Beer;