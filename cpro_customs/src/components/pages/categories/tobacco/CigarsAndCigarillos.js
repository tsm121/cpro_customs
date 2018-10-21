import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import TobaccoItem from "./TobaccoItem";
import TollInfoBanner from "../TollInfoBanner";


class CigarsAndCigarillos extends Component {
    render = () => {
        return (
            <div>
                <TollInfoBanner text={"290 NOK per 100 grams"}/>
                <PageTitle title={"Cigars & Cigarillos"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}>
                    <TobaccoItem icon={"weight"} otherAmount/>
                </Grid>
            </div>
        );
    };
}

export default CigarsAndCigarillos;