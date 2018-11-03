import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import AlcoholOrTobaccoItem from "../AlcoholOrTobaccoItem";
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
            {type: "Spirits", value: 0.35, isOtherAmount: false, icon: "spirits"},
            {type: "Spirits", value: 0.5, isOtherAmount: false, icon: "spirits"},
            {type: "Spirits", value: 0.7, isOtherAmount: false, icon: "spirits"},
            {type: "Spirits", value: 1, isOtherAmount: false, icon: "spirits"},
            {type: "Spirits", value: '', isOtherAmount: true, icon: "pitcher"},
        ];
        let items = [];
        for (let i = 0; i < options.length; ++i) {
            let product = globalState.getAlcoholOrTobacco(options[i].type, options[i].value, options[i].isOtherAmount);
            if (product !== null) {
                items.push(
                    <AlcoholOrTobaccoItem
                        key={items.length}
                        type={options[i].type}
                        isOtherAmount={options[i].isOtherAmount}
                        icon={options[i].icon}
                        value={product !== null ? product.value : options[i].value}
                        amount={product.amount}
                        productId={product.id}
                        showNotification={this.showNotification}
                    />
                )
            } else {
                items.push(
                    <AlcoholOrTobaccoItem
                        key={items.length}
                        type={options[i].type}
                        value={options[i].value}
                        isOtherAmount={options[i].isOtherAmount}
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