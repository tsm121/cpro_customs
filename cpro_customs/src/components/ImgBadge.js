import React, {Component} from 'react'

import Badge from "@material-ui/core/Badge/Badge";

import archive from "../assets/img/icons/128x128/archive_dark_grey.png"
import beerCanSmall from "../assets/img/icons/512x512/beer_can_small_dark_grey.png";
import beerCanBig from "../assets/img/icons/512x512/beer_can_big_dark_grey.png";
import wineBottleSmall from "../assets/img/icons/512x512/wine_dark_grey.png";
import wineBottleBig from "../assets/img/icons/512x512/wine_bottle_big_dark_grey.png";
import fortifiedWine from "../assets/img/icons/512x512/fortified_wine_dark_grey.png";
import spirits from "../assets/img/icons/512x512/spirits_dark_grey.png";
import pitcher from "../assets/img/icons/512x512/pitcher_dark_grey.png"


class ImgBadge extends Component {
    render = () => {
        const icons = {
            "archive": archive,
            "beerCanSmall": beerCanSmall,
            "beerCanBig": beerCanBig,
            "wineBottleSmall": wineBottleSmall,
            "wineBottleBig": wineBottleBig,
            "fortifiedWine": fortifiedWine,
            "spirits": spirits,
            "pitcher": pitcher
        };
        const {icon, badgeContent, color} = this.props;

        return (
            <Badge className="cdp_img_badge" badgeContent={badgeContent} color={color} style={this.props.style}>
                <img
                    className={"cdp_icon_item"}
                    src={icons[icon]}
                    alt={"icon"}
                />
            </Badge>
        );
    };
}

export default ImgBadge;