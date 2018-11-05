import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import AlcoholOrTobaccoItem from "../AlcoholOrTobaccoItem";
import TollInfoBanner from "../TollInfoBanner";
import {closeNotification, exitNotification, showNotification} from "../../../context/NotificationContext";
import SnackBarNotification from "../../../SnackBarNotification";
import {GlobalState} from "../../../context/GlobalState";


class Wine extends Component {
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
                        <PageTitle title={"Wine"}/>
                        <Grid container
                              justify={"center"}
                              alignItems={"center"}
                              spacing={0}
                              direction={"row"}
                        >
                            <TollInfoBanner text={"45 NOK per bottle (0.75l) / 60 NOK per litre"}/>
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
            {unit: "litres", type: "Wine", value: 0.375, isOtherAmount: false, icon: "wineBottleSmall"},
            {unit: "litres", type: "Wine", value: 0.75, isOtherAmount: false, icon: "wineBottleBig"},
            {unit: "litres", type: "Wine", value: 1.5, isOtherAmount: false, icon: "wineBottleBig"},
            {unit: "litres", type: "Wine", value: '', isOtherAmount: true, icon: "pitcher"},
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

export default Wine;