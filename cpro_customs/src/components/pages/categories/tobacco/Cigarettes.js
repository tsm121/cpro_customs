import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import TobaccoItem from "./TobaccoItem";
import TollInfoBanner from "../TollInfoBanner";


class Cigarettes extends Component {
    render = () => {
        return (
            <div>
                <TollInfoBanner text={"200 NOK per 100 pieces"}/>
                <PageTitle title={"Cigarettes"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}>
                    <TobaccoItem amount={200} unit={"pieces"} icon={"cigarettes"}/>
                    <TobaccoItem amount={20} unit={"pieces"} icon={"cigarettes"}/>
                    <TobaccoItem unit={"pieces"} icon={"cigarettes"} otherAmount/>
                </Grid>
            </div>
        );
    };
}

export default Cigarettes;