import React, {Component} from "react";
import PageTitle from "../PageTitle";
import Grid from "@material-ui/core/Grid/Grid";

import "../../../App.css"
import Paper from "@material-ui/core/Paper/Paper";

class Animals extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Animals"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}
                >
                    <Grid item xs={11} sm={10} md={8}>
                        <Paper className={"cdp_paper_category_sub_selection"}>
                            <Grid container
                                  justify={"flex-start"}
                                  alignItems={"center"}
                                  spacing={0}
                            >
                                <Grid item xs={3} sm={3} md={3}>
                                    <Grid container
                                          justify={"flex-end"}
                                          alignItems={"center"}
                                    >
                                        <Grid item xs={8} sm={8} md={8}>
                                            <img className={"icon_md"}
                                                 src={require("assets/img/icons/512x512/dog_dark_grey.png")}
                                                 alt={"icon"}
                                            />
                                        </Grid>
                                        <Grid item xs={2} sm={3} md={2}>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={9} sm={9} md={9}>
                                    <span className={"cdp_category_sub_selection cdp_dark_grey"}>
                                        I am travelling with my pet
                                    </span>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Animals;