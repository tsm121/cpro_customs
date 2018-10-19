import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import AlcoholItem from "./AlcoholItem";


class LightBeer extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Light Beer"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={32}
                      direction={"column"}>
                    <AlcoholItem amount={0.33} icon={"small_can"} />
                    <AlcoholItem amount={0.5} icon={"big_can"} />
                </Grid>
            </div>
        );
    };
}

export default LightBeer;