import React, { Component } from 'react'
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import './ShoppingCartStyle.css';


class IconAndAmount extends Component {

    render = () => {
        const { category, amount, unit } = this.props;
        const icons = {
            "Beer": "beer_can_big_dark_grey",
            // TODO: add other icons. The idea is that the icon gets selected based on the category of the item
            // TODO: the category string has to be passed trough this.props.category to this component
        };
        return (
            <div>
                <Grid container style={{marginTop: '5px', marginBottom: '5px', padding: '0'}}
                      direction={"column"}
                      justify={"center"}
                      alignItems={"center"}
                >
                    <Grid item>
                        <img className={"iconAmount_img"}
                             src={require(`assets/img/icons/512x512/${icons[category]}.png`)}
                             alt={"icon"}
                        />
                    </Grid>

                    <Grid item>
                        <h4 className={"cdp cdp_dark_grey iconAmount_text"}>
                            {unit !== "" ? amount + " " + unit : "x" + amount}
                        </h4>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


IconAndAmount.propTypes = {
    category: PropTypes.string.required,
    amount: PropTypes.number.required,
    unit: PropTypes.string.required,
};

IconAndAmount.defaultProps = {

};

export default withRouter(IconAndAmount);