import React, {Component} from 'react'

import Badge from "@material-ui/core/Badge/Badge";


class ImgBadge extends Component {
    render = () => {
        const {icon, badgeContent, color, onClick, onMouseOver, onMouseOut} = this.props;
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
        };

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
                    src={require(`assets/img/icons/512x512/${icons[icon]}.png`)}
                    alt={icon.toString() + "-icon"}
                />
            </Badge>
        );
    };
}

export default ImgBadge;