import React, {Component} from 'react'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {Icon} from "@material-ui/core";

import PaymentSelection from "./PaymentSelection";
import VisaPayment from "./VisaPayment";
import {GlobalState} from "../../context/GlobalState";

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: '',
            day: '',
            selection: '',
            stageSelection: true,
            stageVisa: false,
            //TODO: Get currency from user selection
            selectedCurrency: 'NOK',
            paymentInProgress: true,
            paymentComplete: false,
        }

        this.paymentComplete = this.paymentComplete.bind(this);
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    userSelection = (selection) => {
        if (selection === "visa") {
            this.setState({
                stageSelection: false,
                stageVisa: true,
            })
        }
    }

    handleGoBackButton = () => {
        this.setState({
            stageSelection: true,
            stageVisa: false,
        })
    }

    paymentComplete = (globalState) => {
        this.setState({
            paymentComplete: true,
            stageVisa: false,
        })

        // payment done
        // delete products from global state
        globalState.setHasPaid(true);
        globalState.setProducts([]);

        this.props.history.push("/endpage")
    }

    render = () => {
        const {stageSelection, stageVisa, selectedCurrency} = this.state
        return (
            <Grid container
                  spacing={8}
                  justify="center"
                  alignItems="center"
                  direction="column"
            >
                <Card
                    className={"payment_container"}
                    raised={true}
                >
                    <CardContent
                        className={"payment_content_container"}
                    >
                        <Grid container
                              direction="row"
                        >
                            <h1 className={"payment_title"}>
                                <Button
                                    disabled={stageSelection}
                                >
                                    <Icon
                                        onClick={this.handleGoBackButton}
                                        style={stageSelection ? {display: "none"} : {display: "unset"}}
                                    >
                                        arrow_back
                                    </Icon>
                                </Button>
                                Payment
                            </h1>
                        </Grid>

                        <Grid container
                              justify="center"
                              alignItems="center"
                        >
                            {stageVisa ? (
                                    <GlobalState.Consumer>
                                        {globalState => (
                                            <VisaPayment
                                                totalSum={globalState.amount_to_pay}
                                                selectedCurrency={selectedCurrency}
                                                paymentComplete={() => {
                                                    this.paymentComplete(globalState)
                                                }}
                                            />)}
                                    </GlobalState.Consumer>
                                )

                                : ""}

                            {stageSelection ? (
                                    <PaymentSelection
                                        handleSelection={this.userSelection}
                                    />)
                                : ''}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}