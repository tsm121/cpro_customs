import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import "./CategoryStyle.css"


export default class CategoryButton extends Component  {
    render = () => {
        const { text, filename } = this.props
        return (
            <div>
                <Button className={"category_button"} variant='contained' size={"large"}
                        /*onClick={this.onClick}*/
                        onMouseOver={this.onMouseOver}
                        onMouseOut={this.onMouseOut}
                >
                    <Grid container
                          direction={"column"}
                          justify={"center"}
                          alignItems={"center"}
                    >
                        <Grid item >
                            <img className={"category_button_img"}
                                 src={require(`assets/img/icons/512x512/${filename}.png`)}
                                 alt={"icon"}
                            />
                        </Grid>

                        <Grid item >
                            <h2 className={"cdp cdp_dark_grey category_button_text"}>{text}</h2>
                        </Grid>
                    </Grid>

                </Button>
            </div>
        )
    }

    onClick = () => {
        this.props.history.push(this.props.route);
    };

    onMouseOver = () => {
        document.body.style.cursor = "pointer";
    };

    onMouseOut = () => {
        document.body.style.cursor = "default";
    };

}