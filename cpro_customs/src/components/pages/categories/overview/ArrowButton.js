import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import { Grid } from "@material-ui/core";

import '../../../App.css'


class NavigationArrow extends Component  {
    constructor(props) {
        super(props);
        // init state
        this.state = {
            showYellowIcon: false,
        };
    }

    render = () => {
        return (
            <Grid container
                  spacing={0}
                  justify="center"
                  alignItems="center"
                  direction="column"
            >
                <Grid item
                      onMouseOver={() => this.nextOnMouseOver()}
                      onMouseOut={() => this.nextOnMouseOut()}
                      onClick={this.props.onClick}
                >
                    {this.addText()}
                </Grid>

                <Grid item
                      onMouseOver={() => this.nextOnMouseOver()}
                      onMouseOut={() => this.nextOnMouseOut()}
                      onClick={this.props.onClick}

                >
                    {this.addIcon()}
                </Grid>
            </Grid>
        )
    };

    addText() {
        const { showYellowIcon } = this.state
        const { text } = this.props

        if (showYellowIcon) {
            return (
                <h4 className={"cdp"} style={{fontSize:'3vw', color:'#ffd200'}}>
                    {text}
                </h4>
            );
        } else {
            return (
                <h4 className={"cdp"} style={{fontSize:'3vw'}}>
                    {text}
                </h4>
            );
        }
    }

    addIcon() {
        const { showYellowIcon } = this.state;
        const { direction } = this.props;
        switch (direction) {
            case "down":
                if (showYellowIcon) {
                    return (
                        <img className="icon_sm"
                             src={require("assets/img/icons/512x512/arrow_down_yellow.png")}
                             alt="icon"
                        />
                    );
                } else {
                    return (
                        <img className="icon_sm"
                             src={require("assets/img/icons/512x512/arrow_down_white.png")}
                             alt="icon"
                        />
                    );
                }
            case "up":
                if (showYellowIcon) {
                    return (
                        <img className="icon_sm"
                             src={require("assets/img/icons/512x512/arrow_up_yellow.png")}
                             alt="icon"
                        />
                    );
                } else {
                    return (
                        <img className="icon_sm"
                             src={require("assets/img/icons/512x512/arrow_up_white.png")}
                             alt="icon"
                        />
                    );
                }
            default:
                throw new Error("prop direction not declared or value invalid")
        }
    }

    nextOnMouseOver() {
        this.setState({
            showYellowIcon: true,
        });
        document.body.style.cursor = "pointer";
    }

    nextOnMouseOut() {
        this.setState({
            showYellowIcon: false,
        });
        document.body.style.cursor = "default";
    }
}

export default withRouter(NavigationArrow);