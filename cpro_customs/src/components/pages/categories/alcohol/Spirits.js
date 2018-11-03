import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import AlcoholItem from "./AlcoholItem";
import TollInfoBanner from "../TollInfoBanner";
import {closeNotification, exitNotification, showNotification} from "../../../context/NotificationContext";
import SnackBarNotification from "../../../SnackBarNotification";
import {GlobalState} from "../../../context/GlobalState";


class Spirits extends Component {
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
                    <div>
                        <PageTitle title={"Spirits"}/>
                        <Grid container
                              justify={"center"}
                              alignItems={"center"}
                              spacing={0}
                              direction={"row"}
                        >
                            <TollInfoBanner text={"230 NOK per bottle (0.7l) / 325 NOK per litre"}/>
                            {this.drawItems(globalState)}
                            <SnackBarNotification
                                open={this.state.openNotification}
                                message={this.state.notificationMessage}
                                onClose={this.closeNotification}
                                onExited={this.exitNotification}
                            />
                        </Grid>
                    </div>
                )}
            </GlobalState.Consumer>
        );
    };

    drawItems = (globalState) => {
        let options = [
            {type: "Spirits", value: 0.35, isPitcher: false, icon: "spirits"},
            {type: "Spirits", value: 0.5, isPitcher: false, icon: "spirits"},
            {type: "Spirits", value: 0.7, isPitcher: false, icon: "spirits"},
            {type: "Spirits", value: 1, isPitcher: false, icon: "spirits"},
            {type: "Spirits", value: '', isPitcher: true, icon: "pitcher"},
        ];
        let items = [];
        for (let i = 0; i < options.length; ++i) {
            let product = globalState.getAlcohol(options[i].type, options[i].value, options[i].isPitcher);
            if (product !== null) {
                items.push(
                    <AlcoholItem
                        key={items.length}
                        type={options[i].type}
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
                        type={options[i].type}
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


}

export default Spirits;