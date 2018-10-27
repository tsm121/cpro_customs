import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import TobaccoItem from "./TobaccoItem";
import TollInfoBanner from "../TollInfoBanner";


class CigarettePaperAndSheaths extends Component {
    render = () => {
        return (
            <div>
                <TollInfoBanner text={"290 NOK per 100 grams"}/>
                <PageTitle title={"Cigarette Paper & Sheaths"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}>
                    <TobaccoItem unit={"grams"} icon={"weight"} otherAmount/>
                </Grid>
            </div>
        );
    };
}

export default CigarettePaperAndSheaths;