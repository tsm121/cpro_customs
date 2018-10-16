import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import Modal from "@material-ui/core/Modal/Modal";
import {withRouter} from "react-router-dom";

const styles =({
    title: {
        marginBottom:'1vw',
        padding: 'calc(10px + vw)',
        fontSize: '4.5vw'
    },
    buttonTextModal: {
        fontSize: '2.3vw',
    }
});

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
                <Button
                        onClick={this.handleOpen}
                        onMouseOver={() => this.nextOnMouseOver()}
                        onMouseOut={() => this.nextOnMouseOut()}
                        style={{
                            width: '14vw',
                            height: '5vw',
                            marginRight: '1em',
                            backgroundColor: this.state.showYellowIcon ? '#ffd200' : 'white'
                        }}
                >
                    <h4 className={"cdp cdp_dark_grey"} style={{fontSize:'2em', textAlign: 'center', margin:'0'}}>
                        Skip
                    </h4>
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className={"modal"}>

                        <Grid container
                              spacing={0}
                              justify={'center'}
                              alignItems={"center"}
                              direction={"row"}
                        >

                            <Grid item xs={12} sm={12} md={12} >
                                <h4 className={"cdp"} style={styles.title}>Skip declaring</h4>
                            </Grid>

                             <Grid item xl={1}
                                   justify={'center'}
                                   alignItems={"center"}>
                                 <Button className={"modal_skip_button"}>
                                     <h2 className={"cdp modal_skip_button_text"} style={styles.buttonTextModal}>
                                         I'm <span className={"cdp_yellow"}> bringing </span> something with me
                                     </h2>
                                 </Button>
                             </Grid>

                             <Grid item xl={1} justify={'center'} alignItems={"center"}>
                                 <Button className={"modal_skip_button"}>
                                     <h2 className={"cdp modal_skip_button_text"} style={styles.buttonTextModal} >
                                         <span>I'm <span className={"cdp_yellow"}> not </span> bringing anything into the country</span>
                                     </h2>
                                 </Button>
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
        document.body.style.cursor = "pointer";
    }

    nextOnMouseOut() {
        this.setState({
            showYellowIcon: false,
        });
        document.body.style.cursor = "default";
    }
}

export default withRouter(SkipWindow);