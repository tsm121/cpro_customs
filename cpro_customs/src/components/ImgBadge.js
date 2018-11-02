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
import cigarettes from "../assets/img/icons/512x512/cigarettes_dark_grey.png"
import snus from "../assets/img/icons/512x512/snus_dark_grey.png";
import pipe from "../assets/img/icons/512x512/pipe_dark_grey.png"
import cigar from "../assets/img/icons/512x512/cigar_dark_grey.png"
import cigarettePaper from "../assets/img/icons/512x512/cigarette_paper_dark_grey.png"
import weight from "../assets/img/icons/512x512/weight_dark_grey.png"
import dog from "../assets/img/icons/512x512/dog_dark_grey.png"
import horse from "../assets/img/icons/512x512/horse_dark_grey.png"
import other from "../assets/img/icons/512x512/animal_dark_grey.png"
import shoppingCart from "../assets/img/icons/512x512/shopping-cart_dark_grey.png"


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
            "pitcher": pitcher,
            "cigarettes": cigarettes,
            "snus": snus,
            "pipe": pipe,
            "cigar": cigar,
            "cigarettePaper": cigarettePaper,
            "weight": weight,
            "dog": dog,
            "horse": horse,
            "other": other,
            "shoppingCart": shoppingCart,
        };
        const {icon, badgeContent, color, onClick, onMouseOver, onMouseOut} = this.props;
        return (
            <Badge
                className="cdp_img_badge"
                badgeContent={badgeContent}
                color={color}
                style={this.props.style}
                onClick={onClick}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
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