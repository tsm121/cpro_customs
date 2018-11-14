import React, {Component} from 'react'
import {withRouter} from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import './ShoppingCartStyle.css';


class IconAndAmount extends Component {

    render = () => {
        const {icon, amount, unit} = this.props;
        const icons = {
            "archive": "archive_dark_grey",
            "beerCanSmall": "beer_can_small_dark_grey",
            "beerCanBig": "beer_can_big_dark_grey",
            "wineBottleSmall": "wine_dark_grey",
            "wineBottleBig": "wine_bottle_big_dark_grey",
            "fortifiedWine": "fortified_wine_dark_grey",
            "spirits": "spirits_dark_grey",
            "pitcher": "pitcher_dark_grey",
            "cigarettes": "cigarettes_dark_grey",
            "snus": "snus_dark_grey",
            "pipe": "pipe_dark_grey",
            "cigar": "cigar_dark_grey",
            "cigarettePaper": "cigarette_paper_dark_grey",
            "weight": "weight_dark_grey",
            "dog": "dog_dark_grey",
            "horse": "horse_dark_grey",
            "other": "animal_dark_grey",
            "shoppingCart": "shopping-cart_dark_grey.png",
            "good" : "archive_dark_grey",
            "diet" : "diet",
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
                             src={require(`assets/img/icons/512x512/${icons[icon]}.png`)}
                             alt={"icon"}
                        />
                    </Grid>

                    <Grid item>
                        <h4 className={"cdp cdp_dark_grey iconAmount_text"}>
                            {unit !== "" && unit !== undefined ? Number.parseFloat(amount).toPrecision(3) + " "
                                + unit : "x" + amount}
                        </h4>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

IconAndAmount.defaultProps = {};

export default withRouter(IconAndAmount);