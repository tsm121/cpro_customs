import React, {Component} from "react";
import PageTitle from "../../../PageTitle";
import Grid from "@material-ui/core/Grid/Grid";

import "../../../../assets/css/core.css"
import Paper from "@material-ui/core/Paper/Paper";

class Animals extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Animals"} />
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={0}
                      direction={"row"}
                >
                    <Grid item xs={11} sm={10} md={9} lg={8} xl={8}>
                        <Paper>
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
                                            <img className={"icon_sm"}
                                                 src={require("assets/img/icons/512x512/dog.png")}
                                                 alt={"icon"}
                                            />
                                        </Grid>
                                        <Grid item xl={1}></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xl={10}>
                                    TODO container with 1 item containing text
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
                            <h1 className={"cdp cdp_secondary"}>Test</h1>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Animals;