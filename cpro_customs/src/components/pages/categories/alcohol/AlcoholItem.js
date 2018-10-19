import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";

import PropTypes from "prop-types";


class AlcoholItem extends Component {
    render = () => {
        const {amount, icon, pitcher} = this.props;
        return (
            <Grid item className={"cdp_sub_selection_max_width_grid_item"}>
                {amount}
                {icon}
                {pitcher}
            </Grid>
        );
    };
}

AlcoholItem.propTypes = {
    amount: PropTypes.number,
    icon: PropTypes.string,
    pitcher: PropTypes.bool,
};

export default AlcoholItem;