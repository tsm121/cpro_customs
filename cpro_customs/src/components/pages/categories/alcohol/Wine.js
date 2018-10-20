import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import AlcoholItem from "./AlcoholItem";
import TollInfoBanner from "../TollInfoBanner";


class Wine extends Component {
    render = () => {
        return (
            <div>
                <TollInfoBanner text={"45 NOK per bottle (0.75l) / 60 NOK per litre"}/>
                <PageTitle title={"Wine"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}>
                    <AlcoholItem amount={0.375} icon={"wineBottleSmall"} />
                    <AlcoholItem amount={0.75} icon={"wineBottleBig"}/>
                    <AlcoholItem amount={1.5} icon={"pitcher"}/>
                    <AlcoholItem amount={3} icon={"pitcher"}/>
                    <AlcoholItem pitcher />
                </Grid>
            </div>
        );
    };
}

export default Wine;