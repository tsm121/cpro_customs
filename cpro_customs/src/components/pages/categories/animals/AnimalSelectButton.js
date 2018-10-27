import React, {Component} from 'react'

import Grid from '@material-ui/core/Grid';

import "./AnimalSelectButton.css"

import dog from "../../../../assets/img/icons/512x512/dog_dark_grey.png";
import horse from "../../../../assets/img/icons/512x512/horse_dark_grey.png";
import other from "../../../../assets/img/icons/512x512/animal_dark_grey.png";

const icons = {
    "dog": dog,
    "horse": horse,
    "other": other,
};

export default class AnimalSelectButton extends Component {
    render = () => {
        const {text, icon} = this.props;
        return (
            <Grid container
                  className={"cdp_animal_select_button"}
                  onClick={this.onClick}
                  onMouseOver={this.onMouseOver}
                  onMouseOut={this.onMouseOut}
            >
                <Grid item xs={12}>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <div className={"cdp_animal_select_button_square"}>
                            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                                <Grid item xs={12}>
                                    <Grid container justify={"center"} alignItems={"center"}>
                                        <img className={"cdp_animal_select_button"} src={icons[icon]}
                                             alt={"icon"}/>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify={"center"} alignItems={"center"}>
                                        <h3 className={"cdp_dark_grey"}>{text}</h3>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        )
    };

    onClick = () => {
        document.body.style.cursor = "default";
    };

    onMouseOver = () => {
        document.body.style.cursor = "pointer";
    };

    onMouseOut = () => {
        document.body.style.cursor = "default";
    };

}