import React, {Component} from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid/Grid";


class TollInfoBanner extends Component {
    render = () => {
        const {text} = this.props;

        return (
            <Grid container>
                <Grid item xs={12} style={{backgroundColor: "white", paddingLeft: "10px"}}>
                    <Grid container justify={"flex-start"} alignItems={"flex-start"}>
                        <p className={"cdp_dark_grey"}>{text}</p>
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

