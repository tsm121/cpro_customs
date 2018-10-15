import React, {Component} from 'react'
import Badge from "@material-ui/core/Badge/Badge";

import archive from "../assets/img/icons/128x128/archive_dark_grey.png"

import "./App.css"

class ImgBadge extends Component {
    render = () => {
        const icons = {archive: archive};
        const {icon, badgeContent, color} = this.props;

        return (
            <Badge className="cdp_img_badge" badgeContent={badgeContent} color={color}>
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