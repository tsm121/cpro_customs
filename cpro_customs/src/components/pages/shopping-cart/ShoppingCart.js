import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import {withRouter} from "react-router-dom";
import DeclarationTable from "./DeclarationTable";

let id = 0;
function createAlcoholAndTobacco(type, icon, amount, unit, value) {
    id++;
    return {id, type, icon, amount, unit, value};
}

class ShoppingCart extends Component {
    state = {
        items: [
            createAlcoholAndTobacco('Bought a dog abroad', "dog", 2, "", 18000),
            createAlcoholAndTobacco('Kitchen', 'archive', 1, '', 20000),
            createAlcoholAndTobacco('Some good', 'archive', 3, '', 1500),
            createAlcoholAndTobacco('Wine', "wineBottleBig", 2, 'L', 0.75),
            createAlcoholAndTobacco('Wine', "wineBottleBig", 4, 'L', 1.5),
            createAlcoholAndTobacco('Spirit', "spirits", 2, "L", 1),
            createAlcoholAndTobacco('Fortified wine', "fortifiedWine", 2, 'L', 0.75),
            createAlcoholAndTobacco('Cigarettes', "cigarettes", 200, 'pieces', 1),
            createAlcoholAndTobacco('Snuff & chewing tobacco', "snus", 100, 'g', 1),
        ],
        freeItems: [],
        payItems: []
    };

    componentDidMount (){
        const {globalState} = this.props

        /*console.log(globalState)
        {globalState.products.map(item => {
            console.log(item)
        })}
        */

        this.splitListAndCalculateFees(globalState)

    }

    render = () => {
        console.log(this.state.freeItems)
        console.log(this.state.payItems)
        return (
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
        )
    }

    /**
     * Splits the global list in two based on the customs rules and updates the local state with these lists
     * @param globalState - the global state containing information about products (list) and overADay (boolean)
     */
    splitListAndCalculateFees = (globalState) => {
        let alcoholAndTobacco = [];
        let other = [];

        // Splits products, alcohol and tobacco vs. everything else
        {globalState.products.map(item => {
            switch (item.type) {
                case "Beer":
                case "Alcopop and others":
                case "Wine":
                case "Fortified wine":
                case "Spirits":
                case "Cigarettes":
                case "Snuff & chewing tobacco":
                case "Smoking tobacco":
                case "Cigars and Cigarillos":
                case "Cigarette paper and sheets":
                    alcoholAndTobacco.push(item);
                    break;
                default:
                    other.push(item);
                    break;
            } return null
        })
        }

        // Sort the "other" list based on value, descending order
        other.sort(function(a, b) {
            return parseFloat(b.value) - parseFloat(a.value);
        });

        // Split alcohol and tobacco into into free and pay and setting the local state
        {this.splitAlcoholAndTobacco(alcoholAndTobacco)}

        // Add the rest of the items to either freeList or payList
        let valueLimit = 3000;
        if (globalState.overADay) valueLimit = 6000;

        let freeItems = [];
        let payItems = [];

        let currentValue = 0;
        for (let item of other){
            if (parseInt(item.value) > valueLimit){
                payItems.push(item);
            } else {
                if (item.amount > 1){
                    // have more of the same item
                    let amountLeft = item.amount;
                    while (amountLeft > 0){
                        if (amountLeft * parseInt(item.value) + currentValue <= valueLimit){
                            let freeItem = JSON.parse(JSON.stringify(item));
                            freeItem.amount = amountLeft;
                            freeItems.push(freeItem);
                            currentValue += amountLeft * parseInt(item.value);

                            if (item.amount - amountLeft > 0) {
                                let payItem = JSON.parse(JSON.stringify(item));
                                payItem.amount = item.amount - amountLeft;
                                payItems.push(payItem);
                            }
                            amountLeft = 0;

                        } else {
                            amountLeft--;
                        }
                    }
                } else {
                    // only one of the current item
                    if (parseInt(item.value) + currentValue <= valueLimit) {
                        freeItems.push(item);
                        currentValue += parseInt(item.value);
                    } else {
                        payItems.push(item);
                    }
                }
            }
        }

        this.calculateFeesAndVAT(payItems);

        // Setting the state so that it contains the other elements
        this.setState(prevState => ({
            freeItems: [...prevState.freeItems, ...freeItems],
            payItems: [...prevState.payItems, ...payItems]
        }))

        //Sending POST-req to server.
        //this.validateData()

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
        let totalPaper = 0;
        let hasTobacco = false;

        // Calculating the different total amounts based on category
        {products.map(item => {
            switch (item.type) {
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
                case "Spirits":
                    totalSpirit += item.value * item.amount;
                    break;
                case "Cigarettes":
                    totalCigarettes += item.value * item.amount;
                    hasTobacco = true;
                    break;
                case "Snuff & chewing tobacco":
                    totalSnuff += item.value * item.amount;
                    hasTobacco = true;
                    break;
                case "Smoking tobacco":
                    totalSmoking += item.value * item.amount;
                    hasTobacco = true;
                    break;
                case "Cigars and Cigarillos":
                    totalCigars += item.value * item.amount;
                    hasTobacco = true;
                    break;
                case "Cigarette paper and sheets":
                    totalPaper += item.value * item.amount;
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
            freeItems.push(createAlcoholAndTobacco('Spirits', 'spirits', 1, "L", 1));
            payItems.push(createAlcoholAndTobacco('Spirits', 'spirits', totalSpirit - 1, "L", 1));
        } else if (totalSpirit <= 1){ //Everything is under the quota
            if (totalSpirit > 0) {
                freeItems.push(createAlcoholAndTobacco('Spirits', 'spirits', totalSpirit, "L", 1));
                wineQuota += 1 - totalSpirit; // see rules above
            }
        }

        // Fortified wine
        if (totalFortifiedWine > wineQuota){ //Too much fortified wine
            freeItems.push(createAlcoholAndTobacco('Fortified wine', 'fortifiedWine', wineQuota, 'L', 1));
            payItems.push(createAlcoholAndTobacco('Fortified wine', 'fortifiedWine', totalFortifiedWine-wineQuota, 'L', 1));
            wineQuota = 0;
        } else if (totalFortifiedWine <= wineQuota && totalFortifiedWine !== 0) {
            freeItems.push(createAlcoholAndTobacco('Fortified wine', 'fortifiedWine', totalFortifiedWine, 'L', 1));
            wineQuota -= totalWine;
        }

        // Wine
        if (totalWine > wineQuota){ //Too much wine
            if (wineQuota !== 0){
                freeItems.push(createAlcoholAndTobacco('Wine', 'wineBottleBig', wineQuota, 'L', 1));
            }
            payItems.push(createAlcoholAndTobacco('Wine', 'wineBottleBig', totalWine-wineQuota, 'L', 1));
            wineQuota = 0;
        } else if (totalWine <= wineQuota && totalWine !== 0) {
            freeItems.push(createAlcoholAndTobacco('Wine', 'wineBottleBig', totalWine, 'L', 1));
            wineQuota -= totalWine;
        }

        // Beer
        let beerQuota = 2 + wineQuota;

        if (totalBeer > beerQuota){ // Too much beer
            freeItems.push(createAlcoholAndTobacco('Beer', 'beerCanBig', beerQuota, 'L', 1));
            payItems.push(createAlcoholAndTobacco('Beer', 'beerCanBig', totalBeer-beerQuota, 'L', 1));
            beerQuota = 0;
        } else if (totalBeer < beerQuota && totalBeer !== 0){
            freeItems.push(createAlcoholAndTobacco('Beer', 'beerCanBig', totalBeer, 'L', 1));
            beerQuota -= totalBeer;
        }

        // Alcopop
        if (totalAlcopop > beerQuota){ // Too much alcopop
            if (beerQuota !== 0) {
                freeItems.push(createAlcoholAndTobacco('Alcopop and others', 'beerCanBig', beerQuota, 'L', 1));
            }
            payItems.push(createAlcoholAndTobacco('Alcopop and others', 'beerCanBig', totalAlcopop-beerQuota, 'L', 1));
        } else if (totalAlcopop < beerQuota && totalAlcopop !== 0){
            freeItems.push(createAlcoholAndTobacco('Alcopop and others', 'beerCanBig', totalAlcopop, 'L', 1));
        }


        // Cigarette papers
        if (totalPaper > 200) {
            freeItems.push(createAlcoholAndTobacco('Cigarette paper and sheets', 'cigarettePaper', 200, 'sheets', 1));
            if(totalPaper-200 > 0) payItems.push(createAlcoholAndTobacco('Cigarette paper and sheets', 'cigarettePaper',
                totalPaper - 200, 'sheets', 1));
        } else {
            if (totalPaper > 0) {
                freeItems.push(createAlcoholAndTobacco('Cigarette paper and sheets', 'cigarettePaper',
                totalPaper, 'sheets', 1));
            }
        }


        // Tobacco
        if (tooMuchTobacco(totalCigarettes, totalSnuff, totalSmoking, totalCigars)) {
            if (totalCigarettes >= 200) { //More than quota
                freeItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', 200, 'pieces', 1));
                if (totalCigarettes !== 200)
                    payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes - 200, 'pieces', 1));
                if (totalSnuff > 0) payItems.push(createAlcoholAndTobacco('Snuff & chewing tobacco', 'snus', totalSnuff, 'g', 1));
                if (totalSmoking > 0) payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 1));
                if (totalCigars > 0) payItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', totalCigars, 'g', 1));

            } else if (totalSnuff >= 250) {
                freeItems.push(createAlcoholAndTobacco('Snuff & chewing tobacco', 'snus', 250, 'g', 1));
                if (totalSnuff !== 250)
                    payItems.push(createAlcoholAndTobacco('Snuff & chewing tobacco', 'snus', totalSnuff - 250, 'g', 1));
                if (totalCigarettes > 0) payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'g', 1));
                if (totalSmoking > 0) payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 1));
                if (totalCigars > 0) payItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', totalCigars, 'g', 1));

            } else if (totalSmoking >= 250) {
                freeItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', 250, 'g', 1));
                if (totalSmoking !== 250)
                    payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking - 250, 'g', 1));
                if (totalCigarettes > 0) payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'g', 1));
                if (totalSnuff > 0) payItems.push(createAlcoholAndTobacco('Snuff & chewing tobacco', 'snus', totalSnuff, 'g', 1));
                if (totalCigars > 0) payItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', totalCigars, 'g', 1));

            } else if (totalCigars >= 250) {
                freeItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', 250, 'g', 1));
                if (totalCigars !== 250)
                    payItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', totalCigars - 250, 'g', 1));
                if (totalCigarettes > 0) payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'g', 1));
                if (totalSmoking > 0) payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 1));
                if (totalSnuff > 0) payItems.push(createAlcoholAndTobacco('Snuff & chewing tobacco', 'snus', totalSnuff, 'g', 1));
            }

        } else {
            if (totalCigarettes > 0) freeItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'pieces', 1));
            if (totalSnuff > 0) freeItems.push(createAlcoholAndTobacco('Snuff & chewing tobacco', 'snus', totalSnuff, 'g', 1));
            if (totalSmoking > 0) freeItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 1));
            if (totalCigars > 0) freeItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', totalCigars, 'g', 1));
        }

        this.calculateFeesAndVAT(payItems);
        console.log(payItems);

        this.setState({
            freeItems: freeItems,
            payItems: payItems
        })

    }


    /**
     * Adds parameters/keys  for fee and VAT in every item that needs to be paid for
     @param: payItems - The local state list containing all the items the user must pay for
     */
    calculateFeesAndVAT = (payItems) => {
        /*
        ---------------- RULES: ---------------------
        Beer, alcopop:          20 kr per liter
        Wine:                   60 kr per liter
        Fortified wine:         115 kr per liter
        Spirits:                325 kr per liter
        Cigarettes:             290 kr per 100 pieces
        Snuff:                  120 kr per 100 grams
        Smoking tabacco/cigars: 290 kr per 100 grams
        Cigarette paper:        5 kr per 100 pieces


        --------------------------------------------
        */

        {payItems.map(item => {
            switch (item.type) {
                case "Beer":
                case "Alcopop and others":
                    item.fee = item.amount * 20;
                    break;
                case "Wine":
                    item.fee = item.amount * 60;
                    break;
                case "Fortified wine":
                    item.fee = item.amount * 115;
                    break;
                case "Spirits":
                    item.fee = item.amount * 325;
                    break;
                case "Cigarettes":
                case "Smoking tobacco":
                case "Cigars and Cigarillos":
                    item.fee = item.amount/100 * 290;
                    break;
                case "Snuff & chewing tobacco":
                    item.fee = item.amount/100 * 120;
                    break;
                case "Cigarette paper and sheets":
                    item.fee = item.amount/100 * 5;
                    break;
                case "Bought Animal":
                    if (item.kind === "horse" && !item.horseHasOriginInEU){
                        item.fee = 5000 * item.amount; // 5000 fee per horse
                    }
                default:
                    item.vat = 0.25 * parseInt(item.value) * item.amount;
                    break;
            }
        })
        }
        return payItems;
    };


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
                "overADay": false,
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


export default withRouter(ShoppingCart);


