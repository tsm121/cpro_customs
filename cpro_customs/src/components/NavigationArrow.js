import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import { Grid } from "@material-ui/core";

import './App.css'


class NavigationArrow extends Component  {
    constructor(props) {
        super(props);
        // init state
        this.state = {
            showYellowIcon: false,
        };
    }

    handleClick = () => {
        this.props.history.push("persons-in-vehicle");
    };

    render = () => {
        return (
            <Grid container
                  spacing={0}
                  justify="center"
                  alignItems="center"
                  direction="row"
                  className="personContainer"
            >
                <Grid item
                      onClick={() => this.nextOnClick()}
                      onMouseOver={() => this.nextOnMouseOver()}
                      onMouseOut={() => this.nextOnMouseOut()}>
                    <Grid container className="nav_container" justify="center" spacing={0}>
                        <Grid item>
                            {this.addIcon()}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    };

    addIcon() {
        const { showYellowIcon } = this.state;
        const { direction } = this.props;
        switch (direction) {
            case "down":
                if (showYellowIcon) {
                    return (
                        <img className="icon_xl pointer"
                             src={require("assets/img/icons/512x512/arrow_down_yellow.png")}
                             alt="arrow-down-yellow"
                        />
                    );
                } else {
                    return (
                        <img className="icon_xl pointer"
                             src={require("assets/img/icons/512x512/arrow_down_white.png")}
                             alt="arrow-down-white"
                        />
                    );
                }
            case "right":
                if (showYellowIcon) {
                    return (
                        <img className="icon_xl pointer"
                             src={require("assets/img/icons/512x512/arrow_right_yellow.png")}
                             alt="arrow-right-yellow"
                        />
                    );
                } else {
                    return (
                        <img className="icon_xl pointer"
                             src={require("assets/img/icons/512x512/arrow_right_white.png")}
                             alt="arrow-right-white"
                        />
                    );
                }
            default:
                throw new Error("prop direction not declared or value invalid")
        }
    }

    nextOnClick() {
        this.props.history.push(this.props.page);
    }

    nextOnMouseOver() {
        this.setState({
            showYellowIcon: true,
        });
    }

    nextOnMouseOut() {
        this.setState({
            showYellowIcon: false,
        });
    }
}

export default withRouter(NavigationArrow);