import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button/Button";

import PageTitle from "../PageTitle";
import Good from "./Good";
import {closeNotification, exitNotification, showNotification} from "../../../context/NotificationContext";
import TollInfoBanner from "../TollInfoBanner";
import SnackBarNotification from "../../../SnackBarNotification";
import {GlobalState} from "../../../context/GlobalState";


class Goods extends Component {
    notificationQueue = [];

    constructor(props) {
        super(props);
        this.state = {
            openNotification: false,
            notificationMessage: "",
            showEmptyGood: true,
        };
        this.showNotification = showNotification.bind(this);
        this.closeNotification = closeNotification.bind(this);
        this.exitNotification = exitNotification.bind(this);
    }

    render = () => {
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <div className={"goods_container"}>
                        <PageTitle title={"Goods"}/>
                        <Button onClick={() => {
                            console.log(globalState.products)
                        }}>Print global state products</Button>
                        <Button onClick={() => {
                            this.forceUpdate();
                        }}>Force Update</Button>
                        <Grid container
                              justify={"center"}
                              alignItems={"center"}
                              spacing={16}
                              direction={"column"}
                        >
                            {this.drawItems(globalState)}
                            <Good
                                key={9999}
                                good={{
                                    "name": '',
                                    "value": '',
                                    "currency": 'NOK',
                                    amount: 0,
                                }}
                                showNotification={this.showNotification}
                            />
                            <Grid item xs={12} sm={12} md={12}>
                                <Grid container spacing={8} onClick={this.handleNewGood}>
                                    <Grid item xs={12}>
                                        <Grid container justify={"center"} alignItems={"center"}>
                                            <Button
                                                className={"cdp_button_round"}
                                                variant="fab"
                                                color="default"
                                                disabled={this.state.showEmptyGood}
                                            >
                                                <AddIcon className={"add_unit_icon"}/>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container justify={"center"} alignItems={"center"}>
                                            {
                                                !this.state.showEmptyGood ?
                                                    <span>New good</span>
                                                    : ""
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
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

    /*
    handleNewGood = () => {
        this.setState({
            showEmptyGood: !this.state.showEmptyGood,
        });
    };*/

    drawItems = (globalState) => {
        let items = [];
        const goods = globalState.getGoods();
        for (let i = 0; i < goods.length; i++) {
            console.log(goods[i]);
            items.push(
                <Good
                    key={goods[i].id}
                    good={goods[i]}
                    showNotification={this.showNotification}
                />
            );
        }
        return items;
    }
}

export default Goods;