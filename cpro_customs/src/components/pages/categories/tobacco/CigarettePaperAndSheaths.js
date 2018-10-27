import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import TobaccoItem from "./TobaccoItem";
import TollInfoBanner from "../TollInfoBanner";


class CigarettePaperAndSheaths extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Cigarette Paper & Sheaths"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}
                >
                    <TollInfoBanner text={"290 NOK per 100 grams"}/>
                    <TobaccoItem unit={"grams"} icon={"weight"} otherAmount/>
                </Grid>
            </div>
        );
    };
}

export default CigarettePaperAndSheaths;