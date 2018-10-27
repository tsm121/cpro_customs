import React, {Component} from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid/Grid";


class TollInfoBanner extends Component {
    render = () => {
        const {text} = this.props;

        return (
            <Grid item xs={12} sm={12} md={12} style={{paddingBottom: "32px"}}>
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item xs={11} className={"cdp_sub_selection_max_width_grid_item"}>
                        <Grid container>
                            <Grid item xs={12} style={{backgroundColor: "#e2e3e5", paddingLeft: "10px"}}>
                                <Grid container justify={"flex-start"} alignItems={"flex-start"}>
                                    <p className={"cdp_dark_grey"}>{text}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

TollInfoBanner.propTypes = {
    text: PropTypes.string.isRequired,
};

export default TollInfoBanner;

