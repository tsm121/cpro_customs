import React, {Component} from "react";
import {withRouter} from 'react-router-dom';

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";

import dog from "../../../../assets/img/icons/512x512/dog_dark_grey.png"
import horse from "../../../../assets/img/icons/512x512/horse_dark_grey.png"
import animal from "../../../../assets/img/icons/512x512/animal_dark_grey.png"

class SubSelection extends Component {
    render = () => {
        const icons = {"dog": dog, "horse": horse, "animal": animal};
        const {text, icon} = this.props;
        return (
            <Grid container
                  justify={"center"}
                  alignItems={"center"}
                  direction={"row"}
            >
                <Grid item xs={11} sm={10} md={8}
                      onClick={this.onClick}
                      onMouseOver={this.onMouseOver}
                      onMouseOut={this.onMouseOut}
                      className={"cdp_sub_paper_hover"}
                >
                    <Paper className={"cdp_category_sub_selection_only_title"} style={{padding:"0.3em"}}>
                        <Grid container
                              justify={"flex-start"}
                              alignItems={"center"}
                        >
                            <Grid item xs={4} sm={3} md={3}>
                                <Grid container
                                      justify={"flex-end"}
                                      alignItems={"center"}
                                >
                                    <Grid item xs={7} sm={7} md={9}>
                                        <Grid container>
                                            <Grid item>
                                                <img className={"icon_xs"}
                                                     src={icons[icon]}
                                                     alt={text.toString() + "-animal-xs-icon"}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8} sm={9} md={9}>
                                    <span className={"cdp_category_sub_selection_only_title cdp_dark_grey"}>
                                        <h3 className={"cdp_category_sub_selection_only_title cdp_dark_grey"}>{text}</h3>
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