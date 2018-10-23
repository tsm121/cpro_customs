import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import TollInfoBanner from "../TollInfoBanner";
import PageTitle from "../PageTitle";
import AlcoholItem from "./AlcoholItem";


class BeerAndAlcopop extends Component {
    render = () => {
        return (
            <div>
                <TollInfoBanner text={"7 NOK per bottle (0.33l) / 20 NOK per litre"}/>
                <PageTitle title={"Beer & Alcopop"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}>
                    <AlcoholItem amount={0.33} icon={"beerCanSmall"} />
                    <AlcoholItem amount={0.5} icon={"beerCanBig"}/>
                    <AlcoholItem pitcher />
                </Grid>
            </div>
        );
    }
}

export default BeerAndAlcopop;