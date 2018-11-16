import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import Modal from "@material-ui/core/Modal/Modal";
import {withRouter} from "react-router-dom";
import "./CategoryStyle.css"


class SkipWindow extends Component  {
    constructor(props) {
        super(props);
        // init state
        this.state = {
            open: false,
            showYellowIcon: false
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button className={"skip_button"}
                        style={{backgroundColor: this.state.showYellowIcon ? '#ffd200' : 'white'}}
                        onClick={this.handleOpen}
                        onMouseOver={() => this.nextOnMouseOver()}
                        onMouseOut={() => this.nextOnMouseOut()}
                        role="button"
                        type="submit"
                        value="skip declaration"
                >
                    <h4 className={"cdp cdp_dark_grey skip_button_text"}>
                        Skip
                    </h4>
                </Button>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className={"modal_skip"}>

                        <Grid container
                              spacing={0}
                              justify={'center'}
                              alignItems={"center"}
                              direction={"row"}
                        >

                            <Grid item xs={12} sm={12} md={12} style={{marginBottom: '1em'}}>
                                <h2 className={"cdp"} style={{marginBottom: "1vmax"}}>Skip declaring?</h2>
                            </Grid>



                            <Grid item xs={10} sm={10} md={10} >
                                <Grid container
                                      justify={"center"}
                                      alignItems={"center"}
                                >
                                    <Button className={"modal_button"}
                                            onClick={this.handleClose.bind(this)}
                                            role="button"
                                            type="submit"
                                            value="close skip window"
                                    >
                                        <h3 className={"cdp modal_button_text"}>
                                            I'm <span className={"cdp_yellow"}> bringing </span> something with me
                                        </h3>
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid item xs={10} sm={10} md={10} >
                                <Grid container
                                      justify={"center"}
                                      alignItems={"center"}
                                >
                                    <Button className={"modal_button"}
                                            onClick={this.onClickEnd.bind(this)}
                                            role="button"
                                            type="submit"
                                            value="nothing to declare"
                                    >
                                        <h3 className={"cdp modal_button_text"} >
                                            <span>I'm <span className={"cdp_yellow"}> not </span> bringing anything into the country</span>
                                        </h3>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>


                    </div>
                </Modal>
            </div>
        );
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

    onClickEnd = () => {
        this.props.history.push(this.props.route);
    };
}

export default withRouter(SkipWindow);