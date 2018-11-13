import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import TollInfoBanner from "../TollInfoBanner";
import {closeNotification, exitNotification, showNotification} from "../../../context/NotificationContext";
import SnackBarNotification from "../../../SnackBarNotification";
import {GlobalState} from "../../../context/GlobalState";
import AlcoholOrTobaccoItem from "../AlcoholOrTobaccoItem";


class CigarettePaperAndSheaths extends Component {
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
                        <PageTitle title={"Cigarette Paper & Sheets"}/>
                        <Grid container
                              justify={"center"}
                              alignItems={"center"}
                              spacing={0}
                              direction={"row"}
                        >
                            <TollInfoBanner text={"290 NOK per 100 grams"}/>
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
            {unit: "grams", type: "Cigarette paper and sheets", value: '', isOtherAmount: true, icon: "cigarettePaper"},
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

export default CigarettePaperAndSheaths;