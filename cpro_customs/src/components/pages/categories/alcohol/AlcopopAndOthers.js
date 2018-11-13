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
            {unit: "litres", type: "Alcopop and others", value: 0.33, isOtherAmount: false, icon: "beerCanSmall"},
            {unit: "litres", type: "Alcopop and others", value: 0.5, isOtherAmount: false, icon: "beerCanBig"},
            {unit: "litres", type: "Alcopop and others", value: '', isOtherAmount: true, icon: "pitcher"},
        ];
        let items = [];
        for (let i = 0; i < options.length; ++i) {
            let product = globalState.getAlcoholOrTobacco(options[i].type, options[i].value, options[i].isOtherAmount);
            items.push(
                <AlcoholOrTobaccoItem
                    key={items.length}
                    unit={options[i].unit}
                    type={options[i].type}
                    isOtherAmount={options[i].isOtherAmount}
                    icon={options[i].icon}
                    value={product !== null ? product.value : options[i].value}
                    amount={product !== null ? product.amount : 0}
                    productId={product !== null ? product.id : null}
                    showNotification={this.showNotification}
                />
            )
        }
        return items;
    };
}

export default AlcopopAndOthers;