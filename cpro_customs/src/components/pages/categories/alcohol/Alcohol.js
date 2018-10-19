import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import AlcoholCategory from "./AlcoholCategory";


class Alcohol extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Alcohol"}/>
                <Grid container spacing={32} direction={"row"}>
                    <Grid item xs={12}>
                        <AlcoholCategory
                            title={"Light Beer"}
                            subtitle={"Over 2.5%"}
                            tollInfo1={"7 NOK per bottle (0.33l)"}
                            tollInfo2={"20 NOK per litre"}
                            icon={"beer"}
                            route={"/categories/alcohol/light-beer"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AlcoholCategory
                            title={"Beer and Alcopop"}
                            subtitle={"Over 2.5% up to 4.7%"}
                            tollInfo1={"7 NOK per bottle (0.33l)"}
                            tollInfo2={"20 NOK per litre"}
                            icon={"beer"}
                            route={"/categories/alcohol/beer-and-alcopop"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AlcoholCategory
                            title={"Wine"}
                            subtitle={"From 4.7% up to 15%"}
                            tollInfo1={"45 NOK per bottle (0.75l)"}
                            tollInfo2={"60 NOK per litre"}
                            icon={"wine"}
                            route={"/categories/alcohol/wine"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AlcoholCategory
                            title={"Fortified wine"}
                            subtitle={"From 15% through to 22%"}
                            tollInfo1={"85 NOK per bottle (0.75l)"}
                            tollInfo2={"115 NOK per litre"}
                            icon={"fortifiedWine"}
                            route={"/categories/alcohol/fortified-wine"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AlcoholCategory
                            title={"Spirits"}
                            subtitle={"From 22% through to 60%"}
                            tollInfo1={"230 NOK per bottle (0.7l)"}
                            tollInfo2={"325 NOK per litre"}
                            icon={"spirits"}
                            route={"/categories/alcohol/spirits"}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    };
}

export default Alcohol;