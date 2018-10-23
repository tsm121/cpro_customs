import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import {withRouter} from "react-router-dom";
import './ShoppingCartStyle.css';

class IconAndAmount extends Component {

    render = () => {
        const { filename, amount, unit } = this.props
        return (
            <div>
                <Grid container
                      direction={"column"}
                      justify={"center"}
                      alignItems={"center"}
                >
                    <Grid item>
                        <img className={"iconAmount_img"}
                             src={require(`assets/img/icons/512x512/${filename}.png`)}
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

export default withRouter(IconAndAmount);