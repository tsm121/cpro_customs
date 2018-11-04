import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";
import Modal from "@material-ui/core/Modal/Modal";

import PageTitle from "../PageTitle";
import BoughtItem from "./BoughtItem";
import {GlobalState} from "../../../context/GlobalState";
import {closeNotification, exitNotification, showNotification} from "../../../context/NotificationContext";
import SnackBarNotification from "../../../SnackBarNotification";


class Bought extends Component {
    notificationQueue = [];

    constructor(props) {
        super(props);
        this.state = {
            showDogInfoModal: false,
            openNotification: false,
            notificationMessage: "",
        };

        this.handleDogInfoModalOpen = this.handleDogInfoModalOpen.bind(this);
        this.showNotification = showNotification.bind(this);
        this.closeNotification = closeNotification.bind(this);
        this.exitNotification = exitNotification.bind(this);
    }


    render = () => {
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <div>
                        <PageTitle title={"I bought an animal abroad"}/>
                        <Grid container
                              justify={"center"}
                              alignItems={"center"}
                              spacing={16}
                              direction={"column"}
                        >
                            {this.drawBoughtItems(globalState)}
                            <BoughtItem
                                key={-1}
                                kindSelected={false}
                                animal={{
                                    kind: 'other',
                                    value: '',
                                    currency: 'NOK',
                                    amount: 0,
                                    contactedNFSA: false,
                                    registeredAtNFSA: false,
                                    horseHasOriginInEU: false,
                                }}
                                showInfoModal={this.handleDogInfoModalOpen}
                                showNotification={this.showNotification}
                            />
                        </Grid>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.showDogInfoModal}
                            onClose={this.handleDogInfoModalClose}
                        >
                            <div className={'modal'}>
                                <Grid container spacing={16}
                                      justify={"center"}
                                      alignItems={"center"}
                                      direction={"row"}
                                >
                                    <Grid container
                                          justify={"center"}
                                    >
                                        <h1 className={"modal_title"}>
                                            Info
                                        </h1>
                                    </Grid>
                                    <Grid container
                                          justify={"center"}
                                    >
                                        <h3 className={"modal_title"}>
                                            Ban on certain breeds of dogs
                                        </h3>
                                        <p>
                                            Certain breeds of dogs are regarded as dangerous, and therefore importation
                                            to Norway is not permitted without a special permit from the police. This
                                            means that you must apply to the police for a permit to bring the dog into
                                            Norway.
                                        </p>
                                    </Grid>
                                </Grid>
                            </div>
                        </Modal>
                        <SnackBarNotification
                            open={this.state.openNotification}
                            message={this.state.notificationMessage}
                            onClose={this.closeNotification}
                            onExited={this.exitNotification}
                        />
                    </div>
                )}
            </GlobalState.Consumer>
        );
    };

    drawBoughtItems = (globalState) => {
        let items = [];
        const animals = globalState.getBoughtAnimals();
        for (let i = 0; i < animals.length; i++) {
            items.push(
                <BoughtItem
                    key={animals[i].id}
                    kindSelected={true}
                    animal={animals[i]}
                    showInfoModal={this.handleDogInfoModalOpen}
                    showNotification={this.showNotification}
                />
            );
        }
        return items;
    };

    handleDogInfoModalOpen = () => {
        this.setState({showDogInfoModal: true});
    };

    handleDogInfoModalClose = () => {
        this.setState({showDogInfoModal: false});
    };
}

export default Bought;