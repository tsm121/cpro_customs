import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";

import beer from "../../../../assets/img/icons/512x512/beer_dark_grey.png";
import alcopop from "../../../../assets/img/icons/512x512/alcopop_dark_grey.png";
import wine from "../../../../assets/img/icons/512x512/wine_dark_grey.png";
import fortifiedWine from "../../../../assets/img/icons/512x512/fortified_wine_dark_grey.png";
import spirits from "../../../../assets/img/icons/512x512/spirits_dark_grey.png";


class AlcoholCategory extends Component {
    render = () => {
        const icons = {
            "beer": beer, "alcopop": alcopop, "wine": wine, "fortifiedWine": fortifiedWine,
            "spirits": spirits
        };
        const {title, subtitle, tollInfo1, tollInfo2, icon} = this.props;

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
                      className={"cdp_sub_selection_max_width_grid_item"}
                >
                    <Paper className={"cdp_paper_category_sub_selection"}>
                        <Grid container alignItems={"center"}>
                            <Grid item xs={4} sm={3} md={3}>
                                <Grid container
                                      justify={"center"}
                                      alignItems={"center"}
                                >
                                    <Grid item xs={7} sm={7} md={8}>
                                        <Grid container>
                                            <Grid item>
                                                <img className={"icon_xs"}
                                                     src={icons[icon]}
                                                     alt={"icon"}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8} sm={9} md={9}>
                                <span className={"cdp_category_sub_selection cdp_dark_grey"}>
                                    {title}
                                </span>
                                <p className={"cdp_dark_grey"}>{subtitle}</p>
                                <p className={"cdp_dark_grey"}>{tollInfo1}<br/>{tollInfo2}</p>
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

AlcoholCategory.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    tollInfo1: PropTypes.string.isRequired,
    tollInfo2: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
};

export default withRouter(AlcoholCategory);