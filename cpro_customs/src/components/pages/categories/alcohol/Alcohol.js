import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid/Grid";

import PageTitle from "../PageTitle";
import SubCategory from "../SubCategory";


class Alcohol extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Alcohol"}/>
                <Grid container spacing={32} direction={"row"}>
                    <Grid item xs={12}>
                        <SubCategory
                            title={"Beer"}
                            subtitle={"Over 2.5%"}
                            tollInfo1={"7 NOK per bottle (0.33l)"}
                            tollInfo2={"20 NOK per litre"}
                            icon={"beerCanSmall"}
                            route={"/categories/alcohol/beer"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SubCategory
                            title={"Alcopop and others"}
                            subtitle={"Over 2.5% up to 4.7%"}
                            tollInfo1={"7 NOK per bottle (0.33l)"}
                            tollInfo2={"20 NOK per litre"}
                            icon={"beerCanSmall"}
                            route={"/categories/alcohol/alcopop-and-others"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SubCategory
                            title={"Wine"}
                            subtitle={"From 4.7% up to 15%"}
                            tollInfo1={"45 NOK per bottle (0.75l)"}
                            tollInfo2={"60 NOK per litre"}
                            icon={"wine"}
                            route={"/categories/alcohol/wine"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SubCategory
                            title={"Fortified wine"}
                            subtitle={"From 15% through to 22%"}
                            tollInfo1={"85 NOK per bottle (0.75l)"}
                            tollInfo2={"115 NOK per litre"}
                            icon={"fortifiedWine"}
                            route={"/categories/alcohol/fortified-wine"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SubCategory
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