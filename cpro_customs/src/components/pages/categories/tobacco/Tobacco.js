import React, {Component} from 'react';
import PageTitle from "../PageTitle";
import Grid from "@material-ui/core/Grid/Grid";
import SubCategory from "../SubCategory";


class Tobacco extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Tobacco"}/>
                <Grid container spacing={32} direction={"row"}>
                    <Grid item xs={12}>
                        <SubCategory
                            title={"Cigarettes"}
                            tollInfo1={"290 NOK per 100 pieces"}
                            icon={"cigarettes"}
                            route={"/categories/tobacco/cigarettes"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SubCategory
                            title={"Snuff and chewing tobacco"}
                            tollInfo1={"120 NOK per 100 grams"}
                            icon={"snus"}
                            route={"/categories/tobacco/snus"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SubCategory
                            title={"Smoking tobacco"}
                            tollInfo1={"290 NOK per 100 grams"}
                            icon={"pipe"}
                            route={"/categories/tobacco/smoking-tobacco"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SubCategory
                            title={"Cigars and cigarillos"}
                            tollInfo1={"290 NOK per 100 grams"}
                            icon={"cigar"}
                            route={"/categories/tobacco/cigars-and-cigarillos"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SubCategory
                            title={"Cigarette paper and sheaths"}
                            tollInfo1={"5 NOK per 100 pieces"}
                            icon={"cigarettePaper"}
                            route={"/categories/tobacco/cigarette-paper-and-sheaths"}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    };
}

export default Tobacco;