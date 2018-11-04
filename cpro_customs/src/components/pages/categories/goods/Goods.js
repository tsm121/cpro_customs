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
                        <Button onClick={() => {
                            this.addAGoodToGlobalState(globalState);
                        }}>Add a good to globalstate</Button>
                        <Grid container
                              justify={"center"}
                              alignItems={"center"}
                              spacing={16}
                              direction={"column"}
                        >
                            {this.drawItems(globalState)}
                            <Good
                                key={-1}
                                good={{
                                    "name": '',
                                    "value": '',
                                    "currency": 'NOK',
                                    "amount": 0,
                                }}
                                showNotification={this.showNotification}
                            />
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

    addAGoodToGlobalState = (globalState) => {
        globalState.addGood("Test", Math.random(), 'NOK', 3);
    };

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