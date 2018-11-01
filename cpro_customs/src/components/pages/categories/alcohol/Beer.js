import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import AlcoholItem from "./AlcoholItem";
import TollInfoBanner from "../TollInfoBanner";
import {GlobalState} from "../../../global_state/GlobalState";


class Beer extends Component {
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
                            <TollInfoBanner text={"7 NOK per bottle (0.33l) / 20 NOK per litre"}/>
                            {this.drawItems(globalState)}
                            {/*<AlcoholItem amount={0.33} icon={"beerCanSmall"}/>
                            <AlcoholItem amount={0.5} icon={"beerCanBig"}/>
                            <AlcoholItem pitcher/>*/}
                        </Grid>
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
                    />
                )
            }
        }
        return items;
    }
}

export default Beer;