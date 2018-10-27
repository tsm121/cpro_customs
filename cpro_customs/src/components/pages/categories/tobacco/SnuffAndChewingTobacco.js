import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import TobaccoItem from "./TobaccoItem";
import TollInfoBanner from "../TollInfoBanner";


class SnuffAndChewingTobacco extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Snuff & chewing Tobacco"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}
                >
                    <TollInfoBanner text={"120 NOK per 100 grams"}/>
                    <TobaccoItem amount={10} unit={"grams"} icon={"snus"}/>
                    <TobaccoItem amount={16.8} unit={"grams"} icon={"snus"}/>
                    <TobaccoItem amount={22} unit={"grams"} icon={"snus"}/>
                    <TobaccoItem amount={24} unit={"grams"} icon={"snus"}/>
                    <TobaccoItem amount={42} unit={"grams"} icon={"snus"}/>
                    <TobaccoItem unit={"grams"} icon={"weight"} otherAmount/>
                </Grid>
            </div>
        );
    };
}

export default SnuffAndChewingTobacco;