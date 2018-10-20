import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import AlcoholItem from "./AlcoholItem";
import TollInfoBanner from "../TollInfoBanner";


class Spirits extends Component {
    render = () => {
        return (
            <div>
                <TollInfoBanner text={"230 NOK per bottle (0.7l) / 325 NOK per litre"}/>
                <PageTitle title={"Spirits"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}>
                    <AlcoholItem amount={0.35} icon={"spirits"} />
                    <AlcoholItem amount={0.5} icon={"spirits"}/>
                    <AlcoholItem amount={0.7} icon={"spirits"}/>
                    <AlcoholItem amount={1} icon={"spirits"}/>
                    <AlcoholItem pitcher />
                </Grid>
            </div>
        );
    };
}

export default Spirits;