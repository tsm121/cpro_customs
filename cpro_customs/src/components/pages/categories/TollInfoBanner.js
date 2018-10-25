import React, {Component} from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid/Grid";
import Chip from "@material-ui/core/Chip/Chip";
import InfoIcon from "@material-ui/icons/Info";
import Avatar from "@material-ui/core/Avatar/Avatar";

class TollInfoBanner extends Component {
    render = () => {
        const {text} = this.props;

        return (
            <Grid item xs={12} sm={12} md={12} style={{paddingBottom: "16px"}}>
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item xs={11} className={"cdp_sub_selection_max_width_grid_item"}>
                        <Grid container justify={"center"} alignItems={"center"}>
                            <Chip
                                label={text}
                                color={"default"}
                                avatar={<Avatar><InfoIcon/></Avatar>}
                                icon={<InfoIcon/>}
                            />
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

