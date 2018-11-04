import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";
import Modal from "@material-ui/core/Modal/Modal";

import PageTitle from "../PageTitle";
import BoughtItem from "./BoughtItem";
import {GlobalState} from "../../../context/GlobalState";


class Bought extends Component {
    state = {
        showDogInfoModal: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            showDogInfoModal: false,
        };

        this.handleDogInfoModalOpen = this.handleDogInfoModalOpen.bind(this);
    }


    render = () => {
        return (
            <GlobalState.Consumer>
                {globalState => (
                    <div>
                        <PageTitle title={"I bought an animal abroad"}/>
                        <Grid container direction={"column"} spacing={16}>
                            {this.drawBoughtItems(globalState)}
                            <BoughtItem
                                animal={{
                                    kindSelected: false,
                                    kind: 'other',
                                    value: '',
                                    currency: 'NOK',
                                    amount: 1,
                                    contactedNFSA: false,
                                    registeredAtNFSA: false,
                                    horseHasOriginInEU: false,
                                }}
                                showInfoModal={this.handleDogInfoModalOpen}
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
                    </div>
                )}
            </GlobalState.Consumer>
        );
    };

    drawBoughtItems = (globalState) => {
        const animals = globalState.getBoughtAnimals();
        let items = [];
        for (let i = 0; i < animals.length; i++) {
            console.log(i);
            console.log(animals[i]);
            items.push(
                <BoughtItem
                    key={i}
                    animal={animals[i]}
                    showInfoModal={this.handleDogInfoModalOpen}
                />
            );
        }
        return items;
    };

    handleAddAnimal = () => {
        let animals = this.state.animals;
        animals.push({
            kindSelected: false,
            kind: 'other',
            value: '',
            currency: 'NOK',
            amount: 0,
            contactedNFSA: false,
            registeredAtNFSA: false
        });
        this.setState({
            animals: animals,
        });
    };

    handleDecrement = (key) => {
        if (this.state.animals[key].amount <= 0) return;
        let animals = this.state.animals;
        animals[key].amount = animals[key].amount - 1;
        this.setState({
            animals: animals,
        });
    };

    handleIncrement = (key) => {
        let animals = this.state.animals;
        animals[key].amount = animals[key].amount + 1;
        this.setState({
            animals: animals,
        });
    };

    handleDogInfoModalOpen = () => {
        this.setState({showDogInfoModal: true});
    };

    handleDogInfoModalClose = () => {
        this.setState({showDogInfoModal: false});
    };
}

export default Bought;