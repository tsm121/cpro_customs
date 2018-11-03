import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import TollInfoBanner from "../TollInfoBanner";
import PageTitle from "../PageTitle";
import AlcoholOrTobaccoItem from "../AlcoholOrTobaccoItem";
import SnackBarNotification from "../../../SnackBarNotification";
import {GlobalState} from "../../../context/GlobalState";
import {showNotification, closeNotification, exitNotification} from "../../../context/NotificationContext";


class AlcopopAndOthers extends Component {
    notificationQueue = [];

    constructor(props) {
        super(props);
        this.state = {
            openNotification: false,
            notificationMessage: "",
        };
        this.closeNotification = closeNotification.bind(this);
        this.exitNotification = exitNotification.bind(this);
        this.showNotification = showNotification.bind(this);
    }

    render = () => {
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <div>
                        <PageTitle title={"Alcopop & others"}/>
                        <Grid container
                              justify={"center"}
                              alignItems={"center"}
                              spacing={0}
                              direction={"row"}
                        >
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
            {type: "Alcopop and others", value: 0.33, isOtherAmount: false, icon: "beerCanSmall"},
            {type: "Alcopop and others", value: 0.5, isOtherAmount: false, icon: "beerCanBig"},
            {type: "Alcopop and others", value: '', isOtherAmount: true, icon: "pitcher"},
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

export default AlcopopAndOthers;