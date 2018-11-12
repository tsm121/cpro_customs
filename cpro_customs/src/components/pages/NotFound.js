import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import {Icon} from "@material-ui/core";
import Button from '@material-ui/core/Button';

export default class NotFound extends Component  {

    handleGoBack = () => {
        this.props.history.push("/");

    }

    render = () => {
        return (
            <Grid container
                  spacing={8}
                  justify="center"
                  alignItems="center"
                  direction="column"
                  style={{marginTop:"2em"}}
            >
                <Grid item className={"not_found_container"}>
                    <h1 className={"not_found_text_yellow_big"}>
                        404
                    </h1>
                </Grid>

                <Grid item >
                    <Icon className={"not_found_icon"}>
                        sentiment_dissatisfied
                    </Icon>
                </Grid>

                <Grid item className={"not_found_container"}>
                    <Grid container
                          direction={"row"}
                          spacing={8}
                          justify={"center"}
                          alignItems={"center"}
                    >
                        <Grid item>
                            <h1 className={"not_found_text_yellow"}>
                                Woops!
                            </h1>
                        </Grid>

                        <Grid item>
                            <h1 className={"not_found_text"}>
                                Something unexpected happened.
                            </h1>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item className={"not_found_container"}>
                    <Grid container
                          alignItems={"Center"}
                          justify={"center"}
                    >

                        <Grid item>
                            <Button
                                variant={"outlined"}
                                style={{
                                    backgroundColor: "white",
                                    color: "#37424a",
                                    minWidth:"8vmax",
                                    minHeight: "3vmax",
                                    marginTop: "2vmax",
                                }}
                                onClick={this.handleGoBack}
                                role="button"
                                type="submit"
                                value="go-back-to-start"
                            >
                                GO BACK
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}