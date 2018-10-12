import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import Modal from "@material-ui/core/Modal/Modal";

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
        whiteSpace: 'initial'
    },
    buttonSkip: {
        backgroundColor: 'white',
        width: '10vw',
        height: '4vw',
        position: 'absolute',
        bottom:'4px',
        right:'16px',
        paddingBottom: '1em',
        margin: 'vw'
    }
});

export default class SkipWindow extends Component  {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen} style={styles.buttonSkip}>Skip</Button>
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
                              direction={"column"}
                        >

                            <Grid item xl={1} >
                                <h1 style={styles.title}>Skip declaring</h1>
                            </Grid>

                             <Grid item xl={1} justify={'center'} alignItems={"center"}>
                                 <Button style={styles.buttonModal}>
                                     <h2 style={styles.buttonTextModal}>
                                         I'm <span style={{color: '#ffd200'}}> bringing </span> something with me
                                     </h2>
                                 </Button>
                             </Grid>

                             <Grid item xl={1} justify={'center'} alignItems={"center"}>
                                 <Button style={styles.buttonModal}>
                                     <h2 style={styles.buttonTextModal}>
                                        I'm <span style={{color: '#ffd200'}}> not </span> bringing anything into the country
                                     </h2>
                                 </Button>
                             </Grid>

                        </Grid>

                    </div>
                </Modal>
            </div>
        );
    }
}