import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";

import beerCanSmall from "../../../assets/img/icons/512x512/beer_can_small_dark_grey.png";
import alcopop from "../../../assets/img/icons/512x512/alcopop_dark_grey.png";
import wine from "../../../assets/img/icons/512x512/wine_dark_grey.png";
import fortifiedWine from "../../../assets/img/icons/512x512/fortified_wine_dark_grey.png";
import spirits from "../../../assets/img/icons/512x512/spirits_dark_grey.png";

import cigarettes from "../../../assets/img/icons/512x512/cigarettes_dark_grey.png"
import snus from "../../../assets/img/icons/512x512/snus_dark_grey.png";
import pipe from "../../../assets/img/icons/512x512/pipe_dark_grey.png"
import cigar from "../../../assets/img/icons/512x512/cigar_dark_grey.png"
import cigarettePaper from "../../../assets/img/icons/512x512/cigarette_paper_dark_grey.png"


class SubCategory extends Component {
    render = () => {
        const icons = {
            "beerCanSmall": beerCanSmall,
            "alcopop": alcopop,
            "wine": wine,
            "fortifiedWine": fortifiedWine,
            "spirits": spirits,
            "cigarettes": cigarettes,
            "snus": snus,
            "pipe": pipe,
            "cigar": cigar,
            "cigarettePaper": cigarettePaper,
        };
        const {title, subtitle, tollInfo1, tollInfo2, icon} = this.props;

        return (
            <Grid container
                  justify={"center"}
                  alignItems={"center"}
                  direction={"row"}
            >
                <Grid item
                      xs={11}
                      sm={10}
                      md={8}
                      className={"cdp_sub_paper_hover cdp_sub_selection_max_width_grid_item"}
                >
                    <Paper
                        className={"cdp_paper_category_sub_selection"}
                    >
                        <Grid container
                              alignItems={"center"}
                        >
                            <Grid item
                                  xs={4}
                                  sm={3}
                                  md={3}>

                                <Grid container
                                      justify={"center"}
                                      alignItems={"center"}
                                >
                                    <Grid item
                                          xs={7}
                                          sm={7}
                                          md={8}
                                    >
                                        <Grid container>
                                            <Grid item>
                                                <img className={"icon_xs"}
                                                     src={icons[icon]}
                                                     alt={"icon"}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item
                                  xs={8}
                                  sm={9}
                                  md={9}
                            >
                                <span className={"cdp_category_sub_selection cdp_dark_grey"}>
                                    {title}
                                </span>
                                <p className={"cdp_dark_grey cdp_sub_sub_title"}>{subtitle}</p>
                                <p className={"cdp_dark_grey cdp_sub_info"}>{tollInfo1}<br/>{tollInfo2}</p>
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

SubCategory.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    tollInfo1: PropTypes.string,
    tollInfo2: PropTypes.string,
    icon: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
};

export default withRouter(SubCategory);