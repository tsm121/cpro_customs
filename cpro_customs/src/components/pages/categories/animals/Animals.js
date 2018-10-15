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
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                        <Paper className={"cdp_paper_category_sub_selection"}>
                            <Grid container
                                  justify={"flex-start"}
                                  alignItems={"center"}
                                  spacing={0}
                            >
                                <Grid item xl={2}>
                                    <Grid container
                                          justify={"flex-end"}
                                          alignItems={"center"}
                                    >
                                        <Grid item xl={6}>
                                            <img className={"icon_md"}
                                                 src={require("assets/img/icons/512x512/dog_dark_grey.png")}
                                                 alt={"icon"}
                                            />
                                        </Grid>
                                        <Grid item xl={3}>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xl={10}>
                                    <span className={"cdp_category_sub_selection cdp_dark_grey"}>
                                        I am travelling with my pet
                                    </span>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}
                >
                    <Grid item xs={11} sm={10} md={9} lg={8} xl={8}>
                        <Paper>
                            <h1 className={"cdp cdp_secondary"}>
                                Test
                            </h1>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Animals;