import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import Modal from "@material-ui/core/Modal/Modal";
import {withRouter} from "react-router-dom";

const styles =({
    modal: {
        display: 'block',
        overflow: 'auto',
        minWidth: '60%',
        maxHeight: '80%',
        paddingRight: '8vw',
        paddingLeft: '8vw',
        paddingBottom: '12vw',
        backgroundColor:'#e2e3e5',
        color: '#37424a',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    title: {
        marginBottom:'5vw',
        padding: 'calc(10px + vw)',
    },
    buttonModal: {
        backgroundColor: '#37424a',
        width: '50vw',
        height: '15vw',
        borderRadius: '0',
        margin: '2vw'
    },
    buttonTextModal: {
        textAlign: 'center',
        color: 'white',
        textTransform: 'none',
        fontFamily: 'Arial, serif',
        fontWeight: 'normal',
        fontSize: '3vw',
        margin: 'vw',
        whiteSpace: 'initial',
        lineHeight: '1.4'
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
                <Button variant={"contained"}
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
                    <div style={styles.modal}>

                        <Grid container
                              spacing={0}
                              justify={'center'}
                              alignItems={"center"}
                              direction={"row"}
                        >

                            <Grid item xl={1} >
                                <h4 className={"cdp"}>Skip declaring</h4>
                            </Grid>

                             <Grid item xl={1}
                                   justify={'center'}
                                   alignItems={"center"}>
                                 <Button style={styles.buttonModal}>
                                     <h2 style={styles.buttonTextModal}>
                                         I'm <span className={"cdp_yellow"}> bringing </span> something with me
                                     </h2>
                                 </Button>
                             </Grid>

                             <Grid item xl={1} justify={'center'} alignItems={"center"}>
                                 <Button style={styles.buttonModal}>
                                     <h2 style={styles.buttonTextModal} >
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