import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import TobaccoItem from "./TobaccoItem";
import TollInfoBanner from "../TollInfoBanner";


class SmokingTobacco extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Smoking Tobacco"}/>
                <TollInfoBanner text={"290 NOK per 100 grams"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}>
                    <TobaccoItem amount={250} unit={"grams"} icon={"weight"}/>
                    <TobaccoItem amount={50} unit={"grams"} icon={"weight"}/>
                    <TobaccoItem unit={"grams"} icon={"weight"} otherAmount/>
                </Grid>
            </div>
        );
    };
}

export default SmokingTobacco;