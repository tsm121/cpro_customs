import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import {withRouter} from "react-router-dom";
import DeclarationTable from "./DeclarationTable";

let id = 0;
function createAlcoholAndTobacco(product, icon, amount, unit, value, vat, duty) {
    id++;
    return {id, product, icon, amount, unit, value, vat, duty};
}

function createBoughtAnimal(kind, value, currency, amount, contactedNFSA, registeredAtNFSA, horseHasOriginInEU) {
    id++;
    return {id, kind, value, currency, amount, contactedNFSA, registeredAtNFSA, horseHasOriginInEU};
}

function createGoods(productName, currency, value, amount, pay){
    id++;
    let VAT = 0;
    if (pay) calculateVAT(value)
    return {id, productName, currency, value, VAT};
}

class ShoppingCart extends Component {
    state = {
        items: [
            createAlcoholAndTobacco('Bought a dog abroad', "dog", 2, "", 18000, 4500, 0),
            createAlcoholAndTobacco('Wine', "wineBottleBig", 2, 'L', 0.75, 0, 0),
            createAlcoholAndTobacco('Wine', "wineBottleBig", 4, 'L', 1.5, 0, 0),
            createAlcoholAndTobacco('Spirit', "spirits", 2, "L", 1, 0, 0),
            createAlcoholAndTobacco('Fortified wine', "fortifiedWine", 2, 'L', 0.75, 0, 0),
            createAlcoholAndTobacco('Cigarettes', "cigarettes", 200, 'pieces', 1, 0, 0),
            createAlcoholAndTobacco('Snuff & chewing Tobacco', "snus", 100, 'g', 1, 0, 0),
        ],
        freeItems: [],
        payItems: []
    };

    componentDidMount (){
        const {globalState} = this.props

        console.log(globalState)
        {globalState.products.map(item => {
            console.log(item)
        })}

        //Todo: Change this.state.items to globalState
        this.splitList(this.state.items)
    }

    render = () => {
        return (
            <div>
                <div>
                    <Grid container
                          direction={'column'}
                          justify={'center'}
                          alignItems={'center'}
                    >
                        <Grid item xs={12} sm={12} md={12}>
                            <h3 className={"cdp shopping_cart_title"}>
                                Declaration <span className={"cdp_yellow"}> list </span>
                            </h3>
                        </Grid>

                        <Grid item>
                            <DeclarationTable
                                items={this.state.items}
                                payItems={this.state.payItems}
                                freeItems={this.state.freeItems}
                            />
                        </Grid>
                    </Grid>
                </div>
                )}
            </div>
        )
    }

    /**
     * Splits the global list in two based on the customs rules and updates the local state with these lists
     * @param products - the global list with products
     */
    splitList = (products) => {
        {this.splitAlcoholAndTobacco(products)}

        //Sending POST-req to server.
        this.validateData()

        // TODO: Implement logic for everything else but alcohol and tobacco

    }

    splitAlcoholAndTobacco = (products) => {
        /*
        RULES ALCOHOL AND TOBACCO:
        Spirit: 1 liter (or 1.5 liters of wine/beer)
        Wine: 1.5 liters (or 1.5 liters of beer)
        Beer: 2 liters
        Tobacco: 200 cigarettes or 250 grams other (or 1.5 liter wine or beer)
            -> You cannot split this. No tobacco or whatever amount up till the limit.
        Cigarette paper: 200 pieces (no trading to alcohol)

        Translate it all to beer volume to calculate total amount to bring:
        total amount allowed = 1.5 + 1.5 + 2 + 1.5 = 6.5 liters

        Spirits: If you don't bring any spirits, you can bring 1.5 liters wine/beer instead. BUT if you bring a smaller
        amount, the total amount shall sum up to 1 liter. For example: 0.5 liter spirit and 0.5 liter beer, or 0.7
        liter spirit and 0.3 liter beer or wine.

         */

        let totalBeer = 0;
        let totalAlcopop = 0;
        let totalWine = 0;
        let totalFortifiedWine = 0;
        let totalSpirit = 0;
        let totalCigarettes = 0;
        let totalSnuff = 0;
        let totalSmoking = 0;
        let totalCigars = 0;
        let hasTobacco = false;

        // Calculating the different total amounts based on category
        {products.map(item => {
            switch (item.product) {
                default:
                    break;
                case "Beer":
                    totalBeer += item.value * item.amount;
                    break;
                case "Alcopop and others":
                    totalAlcopop += item.value * item.amount;
                    break;
                case "Wine":
                    totalWine += item.value * item.amount;
                    break;
                case "Fortified wine":
                    totalFortifiedWine += item.value * item.amount;
                    break;
                case "Spirit":
                    totalSpirit += item.value * item.amount;
                    break;
                case "Cigarettes":
                    totalCigarettes += item.value * item.amount;
                    hasTobacco = true;
                    break;
                case "Snuff & chewing Tobacco":
                    totalSnuff += item.value * item.amount;
                    hasTobacco = true;
                    break;
                case "Smoking tobacco":
                    totalSmoking += item.value * item.amount;
                    hasTobacco = true;
                    break;
                case "Cigars and cigarillos":
                    totalCigars += item.value * item.amount;
                    hasTobacco = true;
                    break;
            } return null
        })
        }

        // Defining quotas
        let wineQuota = 1.5;
        if (!hasTobacco) wineQuota += 1.5;
        if (totalSpirit === 0) wineQuota += 1.5;

        let freeItems = [];
        let payItems = [];

        /*
        --------------------------------------------------------
        Splitting into pay and free based on the customs rules
        --------------------------------------------------------
        */

        // Spirits
        if (totalSpirit > 1) { //Something is over the quota
            freeItems.push(createAlcoholAndTobacco('Spirit', 'spirits', 1, "L", 1, 0, 0));
            payItems.push(createAlcoholAndTobacco('Spirit', 'spirits', totalSpirit - 1, "L", 1, 0, 0));
        } else if (totalSpirit <= 1){ //Everything is under the quota
            if (totalSpirit > 0) {
                freeItems.push(createAlcoholAndTobacco('Spirit', 'spirits', totalSpirit, "L", 1, 0, 0));
                wineQuota += 1 - totalSpirit; // see rules above
            }
        }

        // Wine
        if (totalWine > wineQuota){ //Too much wine
            freeItems.push(createAlcoholAndTobacco('Wine', 'wineBottleBig', wineQuota, 'L', 1, 0, 0));
            payItems.push(createAlcoholAndTobacco('Wine', 'wineBottleBig', totalWine-wineQuota, 'L', 1, 0, 0));
            wineQuota = 0;
        } else if (totalWine <= wineQuota && totalWine !== 0) {
            freeItems.push(createAlcoholAndTobacco('Wine', 'wineBottleBig', totalWine, 'L', 1, 0, 0));
            wineQuota -= totalWine;
        }

        // Fortified wine
        if (totalFortifiedWine > wineQuota){ //Too much fortified wine
            if (wineQuota !== 0){
                freeItems.push(createAlcoholAndTobacco('Fortified wine', 'fortifiedWine', wineQuota, 'L', 1, 0, 0));
            }
            payItems.push(createAlcoholAndTobacco('Fortified wine', 'fortifiedWine', totalFortifiedWine-wineQuota, 'L', 1, 0, 0));
            wineQuota = 0;
        } else if (totalFortifiedWine <= wineQuota && totalFortifiedWine !== 0) {
            freeItems.push(createAlcoholAndTobacco('Fortified wine', 'fortifiedWine', totalFortifiedWine, 'L', 1, 0, 0));
            wineQuota -= totalWine;
        }

        // Beer
        let beerQuota = 2 + wineQuota;

        if (totalBeer > beerQuota){ // Too much beer
            freeItems.push(createAlcoholAndTobacco('Beer', 'beerCanBig', beerQuota, 'L', 1, 0, 0));
            payItems.push(createAlcoholAndTobacco('Beer', 'beerCanBig', totalBeer-beerQuota, 'L', 1, 0, 0));
            beerQuota = 0;
        } else if (totalBeer < beerQuota && totalBeer !== 0){
            freeItems.push(createAlcoholAndTobacco('Beer', 'beerCanBig', totalBeer, 'L', 1, 0, 0));
            beerQuota -= totalBeer;
        }

        // Alcopop
        if (totalAlcopop > beerQuota){ // Too much alcopop
            if (beerQuota !== 0) {
                freeItems.push(createAlcoholAndTobacco('Alcopop and others', 'beerCanBig', beerQuota, 'L', 1, 0, 0));
            }
            payItems.push(createAlcoholAndTobacco('Alcopop and others', 'beerCanBig', totalAlcopop-beerQuota, 'L', 1, 0, 0));
        } else if (totalAlcopop < beerQuota && totalAlcopop !== 0){
            freeItems.push(createAlcoholAndTobacco('Alcopop and others', 'beerCanBig', totalAlcopop, 'L', 1, 0, 0));
        }


        // Tobacco
        if (tooMuchTobacco(totalCigarettes, totalSnuff, totalSmoking, totalCigars)) {
            if (totalCigarettes >= 200) { //More than quota
                freeItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', 200, 'pieces', 1, 0, 0));
                if (totalCigarettes !== 200)
                    payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes - 200, 'pieces', 1, 0, 0));
                if (totalSnuff > 0) payItems.push(createAlcoholAndTobacco('Snuff & chewing Tobacco', 'snus', totalSnuff, 'g', 1, 0, 0));
                if (totalSmoking > 0) payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 1, 0, 0));
                if (totalCigars > 0) payItems.push(createAlcoholAndTobacco('Cigars and cigarillos', 'cigar', totalCigars, 'g', 1, 0, 0));

            } else if (totalSnuff >= 250) {
                freeItems.push(createAlcoholAndTobacco('Snuff & chewing Tobacco', 'snus', 250, 'g', 1, 0, 0));
                if (totalSnuff !== 250)
                    payItems.push(createAlcoholAndTobacco('Snuff & chewing Tobacco', 'snus', totalSnuff - 250, 'g', 1, 0, 0));
                if (totalCigarettes > 0) payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'g', 1, 0, 0));
                if (totalSmoking > 0) payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 1, 0, 0));
                if (totalCigars > 0) payItems.push(createAlcoholAndTobacco('Cigars and cigarillos', 'cigar', totalCigars, 'g', 1, 0, 0));

            } else if (totalSmoking >= 250) {
                freeItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', 250, 'g', 1, 0, 0));
                if (totalSmoking !== 250)
                    payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking - 250, 'g', 1, 0, 0));
                if (totalCigarettes > 0) payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'g', 1, 0, 0));
                if (totalSnuff > 0) payItems.push(createAlcoholAndTobacco('Snuff & chewing Tobacco', 'snus', totalSnuff, 'g', 1, 0, 0));
                if (totalCigars > 0) payItems.push(createAlcoholAndTobacco('Cigars and cigarillos', 'cigar', totalCigars, 'g', 1, 0, 0));

            } else if (totalCigars >= 250) {
                freeItems.push(createAlcoholAndTobacco('Cigars and cigarillos', 'cigar', 250, 'g', 1, 0, 0));
                if (totalCigars !== 250)
                    payItems.push(createAlcoholAndTobacco('Cigars and cigarillos', 'cigar', totalCigars - 250, 'g', 1, 0, 0));
                if (totalCigarettes > 0) payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'g', 1, 0, 0));
                if (totalSmoking > 0) payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 1, 0, 0));
                if (totalSnuff > 0) payItems.push(createAlcoholAndTobacco('Snuff & chewing Tobacco', 'snus', totalSnuff, 'g', 1, 0, 0));
            }

        } else {
            if (totalCigarettes > 0) freeItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'pieces', 1, 0, 0));
            if (totalSnuff > 0) freeItems.push(createAlcoholAndTobacco('Snuff & chewing Tobacco', 'snus', totalSnuff, 'g', 1, 0, 0));
            if (totalSmoking > 0) freeItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 1, 0, 0));
            if (totalCigars > 0) freeItems.push(createAlcoholAndTobacco('Cigars and cigarillos', 'cigar', totalCigars, 'g', 1, 0, 0));
        }

        {this.setFreeAndPayItems(freeItems, payItems)}

    }

    setFreeAndPayItems (newFreeItems, newPayItems){
        this.setState({
            freeItems: newFreeItems,
            payItems: newPayItems,
        })
    }

    validateData = () => {

        console.log("fetching")

        const username = "react";
        const password = "f$rSn6ydLk3s6XM3nJQ#17bqgfD0i";


        fetch("https://toll.idi.ntnu.no/api/backend/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
            },
            body: JSON.stringify({
                "id_number": "0",
                "license_plate": "AAA000",
                "date": "2018-30-19T15:17:21.198799+02:00",
                "amount_to_pay": "2500",
                "reference_number": "2",
                "currency": "NOK",
                "products": [
                    {
                        "product": "dog",
                        "value": "10000",
                        "amount": "1",
                        "unit": "pieces",
                        "fee": "0",
                        "contacted_NFSA": true,
                        "vat": "25",
                        "currency": "NOK"
                    }
                ]
            })
        }).then(promise => promise.json())
            .then(getUrl => console.log(getUrl.url))
    }

}

function tooMuchTobacco(cigarettes, snuff, smoking, cigars){
    let otherTobacco = snuff + smoking + cigars;
    return !((otherTobacco === 0 && cigarettes <= 200) || (cigarettes === 0 && otherTobacco <= 250));
}

function calculateFee(product){

}



function calculateVAT(value){

}

export default withRouter(ShoppingCart);


