import React, { Component } from 'react'
import withRouter from "react-router/es/withRouter";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import "./CategoryStyle.css"
import PropTypes from "prop-types";


class CategoryButton extends Component  {
    render = () => {
        const { text, filename } = this.props;
        return (
            <div>
                <Button className={"category_button"} variant='contained' size={"large"}
                        onClick={this.onClick}
                        onMouseOver={this.onMouseOver}
                        onMouseOut={this.onMouseOut}
                        role="button"
                        type="submit"
                        value={text.toString()}
                >
                    <Grid container
                          direction={"column"}
                          justify={"center"}
                          alignItems={"center"}
                    >
                        <Grid item >
                            <img className={"category_button_img"}
                                 src={require(`assets/img/icons/512x512/${filename}.png`)}
                                 alt={text.toString() + "-cat-icon"}
                            />
                        </Grid>

                        <Grid item >
                            <h2 className={"cdp cdp_dark_grey category_button_text"}>{text}</h2>
                        </Grid>
                    </Grid>

                </Button>
            </div>
        )
    };

    onClick = () => {
        if (this.props.route.length <= 0) return;
        this.props.history.push(this.props.route);
    };

    onMouseOver = () => {
        document.body.style.cursor = "pointer";
    };

    onMouseOut = () => {
        document.body.style.cursor = "default";
    };
}

CategoryButton.propTypes = {
    text: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
};

export default withRouter(CategoryButton);

