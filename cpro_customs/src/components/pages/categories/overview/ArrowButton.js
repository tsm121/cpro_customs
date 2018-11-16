import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import { Grid } from "@material-ui/core";

import '../../../App.css'


class ArrowButton extends Component  {
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
                  justify="center"
                  alignItems="center"
                  direction="column"
            >
                <Grid item
                      onMouseOver={() => this.nextOnMouseOver()}
                      onMouseOut={() => this.nextOnMouseOut()}
                      onClick={this.props.onClick}
                      role="button"
                      type="submit"
                      value="more or less categories"
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
                <h4 className={"cdp arrow_button_text"} style={{color:'#ffd200'}}>
                    <div className={"pointer"}>
                    {text}
                    </div>
                </h4>
            );
        } else {
            return (
                <h4 className={"cdp arrow_button_text"}>
                    <div className={"pointer"}>
                        {text}
                    </div>
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
                        <img className="icon_sm pointer"
                             src={require("assets/img/icons/512x512/arrow_down_yellow.png")}
                             alt="arrow-down-yellow-cat"
                        />
                    );
                } else {
                    return (
                        <img className="icon_sm pointer"
                             src={require("assets/img/icons/512x512/arrow_down_white.png")}
                             alt="arrow-down-white-cat"
                        />
                    );
                }
            case "up":
                if (showYellowIcon) {
                    return (
                        <img className="icon_sm pointer"
                             src={require("assets/img/icons/512x512/arrow_up_yellow.png")}
                             alt="arrow-up-yellow-cat"
                        />
                    );
                } else {
                    return (
                        <img className="icon_sm pointer"
                             src={require("assets/img/icons/512x512/arrow_up_white.png")}
                             alt="arrow-up-white-cat"
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
    }

    nextOnMouseOut() {
        this.setState({
            showYellowIcon: false,
        });
    }
}

export default withRouter(ArrowButton);