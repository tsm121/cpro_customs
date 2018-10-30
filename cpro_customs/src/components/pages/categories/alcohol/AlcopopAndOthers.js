import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import TollInfoBanner from "../TollInfoBanner";
import PageTitle from "../PageTitle";
import AlcoholItem from "./AlcoholItem";


class AlcopopAndOthers extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Beer & Alcopop"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}
                >
                    <TollInfoBanner text={"7 NOK per bottle (0.33l) / 20 NOK per litre"}/>
                    <AlcoholItem amount={0.33} icon={"beerCanSmall"}/>
                    <AlcoholItem amount={0.5} icon={"beerCanBig"}/>
                    <AlcoholItem pitcher/>
                </Grid>
            </div>
        );
    }
}

export default AlcopopAndOthers;