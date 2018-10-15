import React, {Component} from "react";
import {withRouter} from 'react-router-dom';

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";

import dog from "../../../assets/img/icons/512x512/dog_dark_grey.png"
import horse from "../../../assets/img/icons/512x512/horse_dark_grey.png"
import animal from "../../../assets/img/icons/512x512/animal_dark_grey.png"

class SubSelection extends Component {
    render = () => {
        const icons = {"dog": dog, "horse": horse, "animal": animal};
        const {text, icon} = this.props;
        return (
            <Grid container
                  justify={"center"}
                  alignItems={"center"}
                  spacing={0}
                  direction={"row"}
            >
                <Grid item xs={11} sm={10} md={8}
                      onClick={this.onClick}
                      onMouseOver={this.onMouseOver}
                      onMouseOut={this.onMouseOut}
                >
                    <Paper className={"cdp_paper_category_sub_selection"}>
                        <Grid container
                              justify={"flex-start"}
                              alignItems={"center"}
                              spacing={0}
                        >
                            <Grid item xs={4} sm={3} md={3}>
                                <Grid container
                                      justify={"flex-end"}
                                      alignItems={"center"}
                                >
                                    <Grid item xs={7} sm={7} md={8}>
                                        <Grid container>
                                            <Grid item>
                                                <img className={"icon_md"}
                                                 src={icons[icon]}
                                                 alt={"icon"}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={2}>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8} sm={9} md={9}>
                                    <span className={"cdp_category_sub_selection cdp_dark_grey"}>
                                        {text}
                                    </span>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    };

    onClick = () => {
        this.props.history.push(this.props.route);
    };

    onMouseOver = () => {
        document.body.style.cursor = "pointer";
    };

    onMouseOut = () => {
        document.body.style.cursor = "default";
    };
}

export default withRouter(SubSelection);