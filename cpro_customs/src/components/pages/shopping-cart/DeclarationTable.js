import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid/Grid";
import TotalTable from "./TotalTable";
import SubTable from "./SubTable";
import {validateData} from "./logic/validateData";
import {GlobalState} from "../../context/GlobalState";
import OverLimitFeedback from "./OverLimitFeedback";
import {fixFormatting} from "./helper_methods/fixFormatting";
import {mergeLists} from "./helper_methods/mergeLists";

let aboveLimitList = []

class DeclarationTable extends Component {
    componentDidUpdate() {
        const {payItems, globalState} = this.props;
        const total_duty = this.getTotalDuty(payItems);
        if (globalState.amount_to_pay !== total_duty) {
            globalState.setAmountToPay(this.getTotalDuty(payItems));
        }

        this.aboveMaximumLimit()
    }

    render = () => {
        const {payItems, freeItems} = this.props

        return (
            <GlobalState.Consumer>
                {globalState => (
                    <div>
                        <Paper className={"paper limit_error"}
                               style={aboveLimitList.length > 0 ? {} : {display:"none"}}
                        >

                            <OverLimitFeedback
                                overLimit={aboveLimitList.length > 0}
                                aboveLimitList={aboveLimitList}
                            />
                        </Paper>

                        <Paper className={"paper"}>
                            <Grid container
                                  alignItems={"center"}
                                  justify={"center"}
                            >
                                <Grid item xs={12} sm={12} md={12}>
                                    <h3 className={"cdp cdp_dark_grey declaration_table_header"}>
                                        Items you are bringing with you
                                    </h3>
                                </Grid>

                            </Grid>

                            {payItems.length > 0 ?
                                <SubTable isPayTable={true} payItems={payItems} freeItems={freeItems}
                                          removeItem={this.props.removeItem} /> : ""}
                            {freeItems.length > 0 ?
                                <SubTable isPayTable={false} payItems={payItems} freeItems={freeItems}
                                          removeItem={this.props.removeItem} /> : ""}

                        </Paper>
                        <Paper className={'paper'} style={{marginTop: "20px"}}>
                            <TotalTable onClickValidate={() => this.onClickValidateData(globalState)}
                                        globalState={globalState} route={'/checkout'}
                                        disablePayButton={this.enableButton(globalState)}
                                        enablePayButton={this.enableButton}
                                        payItems={payItems}
                            />
                        </Paper>
                    </div>
                )}
            </GlobalState.Consumer>
        )
    };

    enableButton (globalState) {
        if (aboveLimitList.length > 1 || globalState.products.length === 0) {
            return true
        } else if (aboveLimitList.length === 0) {
            return false
        }
    }


    /**
     * Checks if the total amount added to cart exceeds the limits and return
     * @returns array of arrays(tuples) containing the information about "Item" and "Amount above limit"
     *          - On the format [[string, number], [string, number], ...]
     */
    aboveMaximumLimit = () => {
        aboveLimitList = []
        /*
        RULES (How much can you bring ABOVE the limit):
        Liters of alcohol (excluding spirits)       27 liters => 33.5 liters
        Liters of spirit                            4 liters => 5 liters
        Grams of tobacco (smoking, cigars, snuff)   500 grams => 750 grams
        Pieces of cigarettes                        400 pieces => 600 pieces
        Sheets of cigarette papers                  400 pieces => 600 pieces
        */
        const { totalAmounts } = this.props

        let aboveLimit = [];

        if (totalAmounts.litersOfAlcohol > 33.5) aboveLimit.push(["Alcohol (excluding spirits)", totalAmounts.litersOfAlcohol - 33.5]);
        if (totalAmounts.litersOfSpirits > 5) aboveLimit.push(["Spirits", totalAmounts.litersOfSpirits - 5]);
        if (totalAmounts.gramsOfTobacco > 750) aboveLimit.push(["Tobacco (excluding cigarettes)", totalAmounts.gramsOfTobacco - 750]);
        if (totalAmounts.piecesOfCigarettes > 600) aboveLimit.push(["Cigarettes", totalAmounts.piecesOfCigarettes - 600]);
        if (totalAmounts.papers > 600) aboveLimit.push(["Cigarette Papers", totalAmounts.paper - 600]);

        aboveLimitList = aboveLimit
    };

    getTotalDuty = (payItems) => {
        let sum = 0;
        {payItems.map(item => {
            if (item.vat !== undefined) sum += item.vat;
            if (item.fee !== undefined) sum += item.fee;
        })
        }
        return sum;
    };

    onClickValidateData = (globalState) => {
        let json = this.createJSON(globalState);

        if (json !== {}){
            globalState.setJSON(json);
        }

        return validateData(json, false);
    };

    createJSON = (globalState) => {
        const {payItems, freeItems} = this.props;
        let productList = mergeLists(payItems, freeItems);

        return {
            "id_number": "0",
            "license_plate": JSON.parse(localStorage.getItem('userData')).licencePlate,
            "email": JSON.parse(localStorage.getItem('userData')).email,
            "date": "2018-30-19T15:17:21.198799+02:00",
            "amount_to_pay": globalState.amount_to_pay,
            "reference_number": "1",
            "currency": "NOK",
            "over_a_day": globalState.overADay,
            "number_of_people": globalState.number_of_people,
            "products": fixFormatting(productList)
        }
    };

    fixFormatting = (productList) => {
        if (productList.length <= 0){
            return {}
        }

        let productListCopy = JSON.parse(JSON.stringify(productList)); //copying the list to make changes
        for (let item of productListCopy) {
            if ('kind' in item){
                if(item.kind === "dog"){
                    item.kind = "Dog"
                } else if (item.kind === "horse"){
                    item.kind = "Horse"
                } else {
                    item.kind = "Other"
                }

                item.product = item.kind;
                delete item.kind;
                delete item.type;

            } else {
                item.product = item.type;
                delete item.type;
            }

            delete item.id;
            delete item.icon;
            item.vat = 25;
            item.amount = parseFloat(item.amount.toFixed(2));
            {typeof item.value === "string" ? parseInt(item.value, 10) : item.value}
            {item.value === 1 ? item.value = 0 : item.value = item.value * item.amount}

            if (!('fee' in item)) item.fee = 0;
            if (item.unit === "L") item.unit = "litre";
            if (item.unit === "g") item.unit = "grams";
            if (!('unit' in item)) item.unit = "pieces";
            if ('isOtherAmount' in item) delete item.isOtherAmount;
            if ('currency' in item) delete item.currency;

            if ('contactedNFSA' in item){
                item.contacted_NFSA = item.contactedNFSA;
                delete item.contactedNFSA
            }
            if ('horseHasOriginInEU' in item){
                item.of_EU_origin = item.horseHasOriginInEU;
                delete item.horseHasOriginInEU
            }
            if ('registeredAtNFSA' in item){
                item.registered_NFSA = item.registeredAtNFSA;
                delete item.registeredAtNFSA
            }
        }

        this.aboveMaximumLimit()

        return productListCopy

    }
}

export default withRouter(DeclarationTable);