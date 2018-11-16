import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import {withRouter} from "react-router-dom";
import DeclarationTable from "./DeclarationTable";
import {calculateFeesAndVAT} from "./logic/calculateFeeAndVAT";
import {splitOtherGoods} from "./logic/splitOtherGoods";

let id = 0;
function createAlcoholAndTobacco(type, icon, amount, unit, value) {
    id++;
    return {id, type, icon, amount, unit, value};
}

class ShoppingCart extends Component {
    state = {
        freeItems: [],
        payItems: [],
        totalAmounts: {
            litersOfAlcohol: 0,
            litersOfSpirits: 0,
            gramsOfTobacco: 0,
            piecesOfCigarettes: 0,
            papers: 0,
        }
    };

    componentDidMount (){
        const {globalState} = this.props;
        this.splitListAndCalculateFees(globalState)
    }

    render = () => {
        const {globalState} = this.props;
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
                            payItems={this.state.payItems}
                            freeItems={this.state.freeItems}
                            totalAmounts={this.state.totalAmounts}
                            globalState={globalState}
                            removeItem={this.removeItem}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }

    /**
     * Removes an item from the product list (removes therefore from both local and global state).
     * @param index
     * @param item
     * @param isPayTable
     */
    removeItem = (isPayTable, index, item) => {
        const {globalState} = this.props;

        // Remove from local state
        let payItems = [...this.state.payItems];
        let freeItems = [...this.state.freeItems];
        let totalAmounts = {};

        if (isPayTable) {
            let freeItemsIndex = this.findListIndex(freeItems, item);
            if (freeItemsIndex > -1){
                totalAmounts = this.removeFromTotalAmounts(globalState, freeItems[freeItemsIndex], payItems[index]);
                freeItems.splice(freeItemsIndex, 1);
            }
            payItems.splice(index, 1);

        } else {
            let payItemsIndex = this.findListIndex(payItems, item);
            if (payItemsIndex > -1) {
                totalAmounts = this.removeFromTotalAmounts(globalState, freeItems[index], payItems[payItemsIndex]);
                payItems.splice(payItemsIndex, 1);
            }
            freeItems.splice(index, 1);
        }

        this.setState({
            payItems: payItems,
            freeItems: freeItems,
            totalAmounts: totalAmounts
        });

        // Remove from global state
        if (item.type === "Goods"){
            globalState.removeAllElementsWithName(item.name);
        } else if (item.type === "Bought Animal") {
            globalState.removeAllElementsWithKind(item.kind);
        } else {
            globalState.removeAllElementsOfType(item.type);
        }

    };

    removeFromTotalAmounts = (globalState, freeItem, payItem) => {
        let totalAmounts = JSON.parse(JSON.stringify(this.state.totalAmounts));

        if (globalState.isAlcoholOrTobacco(freeItem.type)){
            switch (freeItem.type){
                case "Beer":
                case "Alcopop and others":
                case "Wine":
                case "Fortified wine":
                    totalAmounts.litersOfAlcohol -= (freeItem.amount + payItem.amount);
                    break;
                case "Spirits":
                    totalAmounts.litersOfSpirits -= (freeItem.amount + payItem.amount);
                    break;
                case "Cigarettes":
                    totalAmounts.piecesOfCigarettes -= (freeItem.amount + payItem.amount);
                    break;
                case "Snuff and chewing tobacco":
                case "Smoking tobacco":
                case "Cigars and Cigarillos":
                    totalAmounts.gramsOfTobacco -= (freeItem.amount + payItem.amount);
                    break;
                case "Cigarette paper and sheets":
                    totalAmounts.papers -= (freeItem.amount + payItem.amount);
                    break;
            }
        }
        return totalAmounts;

    }

    findListIndex = (items, item) => {
        let itemsIndex = -1;
        if (item.type === "Goods"){
            itemsIndex = this.findIndexGivenTypeAndName(items, item.type, item.name)
        } else {
            itemsIndex = this.findIndexGivenType(items, item.type)
        }
        return itemsIndex
    }

    findIndexGivenType = (items, type) => {
        for (let i = 0; i < items.length; i++ ){
            if (items[i].type === type){
                return i;
            }
        }
        return -1
    };

    findIndexGivenTypeAndName = (items, type, name) => {
        for (let i = 0; i < items.length; i++ ){
            if (items[i].type === type && items[i].name === name){
                return i;
            }
        }
        return -1
    };

    /**
     * Splits the global list in two based on the customs rules and updates the local state with these lists
     * @param globalState - the global state containing information about products (list) and overADay (boolean)
     */
    splitListAndCalculateFees = (globalState) => {
        let alcoholAndTobacco = [];
        let other = [];
        let freeItems = [];
        let payItems = [];
        
        // Splits products, alcohol and tobacco vs. everything else
        for (let item of globalState.products){
            switch (item.type) {
                case "Beer":
                case "Alcopop and others":
                case "Wine":
                case "Fortified wine":
                case "Spirits":
                case "Cigarettes":
                case "Snuff and chewing tobacco":
                case "Smoking tobacco":
                case "Cigars and Cigarillos":
                case "Cigarette paper and sheets":
                    alcoholAndTobacco.push(item);
                    break;
                default:
                    other.push(item);
                    break;
            }
        }

        // Sort the "other" list based on value, descending order
        other.sort(function(a, b) {
            return parseFloat(b.value) - parseFloat(a.value);
        });

        // Split alcohol and tobacco into into free and pay and setting the local state
        this.splitAlcoholAndTobacco(alcoholAndTobacco);

        // Split the other goods and calculate fees and vat
        [freeItems, payItems] = splitOtherGoods(globalState, other);
        calculateFeesAndVAT(payItems);

        // Setting the state so that it contains the other elements
        this.setState(prevState => ({
            freeItems: [...prevState.freeItems, ...freeItems],
            payItems: [...prevState.payItems, ...payItems]
        }))


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
        for (let item of products){
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
                case "Snuff and chewing tobacco":
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
            }
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
            freeItems.push(createAlcoholAndTobacco('Spirits', 'spirits', 1, "L", 0));
            payItems.push(createAlcoholAndTobacco('Spirits', 'spirits', totalSpirit - 1, "L", 0));
        } else if (totalSpirit <= 1){ //Everything is under the quota
            if (totalSpirit > 0) {
                freeItems.push(createAlcoholAndTobacco('Spirits', 'spirits', totalSpirit, "L", 0));
                wineQuota += 1 - totalSpirit; // see rules above
            }
        }

        // Fortified wine
        if (totalFortifiedWine > wineQuota){ //Too much fortified wine
            freeItems.push(createAlcoholAndTobacco('Fortified wine', 'fortifiedWine', wineQuota, 'L', 0));
            payItems.push(createAlcoholAndTobacco('Fortified wine', 'fortifiedWine', totalFortifiedWine-wineQuota, 'L', 0));
            wineQuota = 0;
        } else if (totalFortifiedWine <= wineQuota && totalFortifiedWine !== 0) {
            freeItems.push(createAlcoholAndTobacco('Fortified wine', 'fortifiedWine', totalFortifiedWine, 'L', 0));
            wineQuota -= totalWine;
        }

        // Wine
        if (totalWine > wineQuota){ //Too much wine
            if (wineQuota !== 0){
                freeItems.push(createAlcoholAndTobacco('Wine', 'wineBottleBig', wineQuota, 'L', 0));
            }
            payItems.push(createAlcoholAndTobacco('Wine', 'wineBottleBig', totalWine-wineQuota, 'L', 0));
            wineQuota = 0;
        } else if (totalWine <= wineQuota && totalWine !== 0) {
            freeItems.push(createAlcoholAndTobacco('Wine', 'wineBottleBig', totalWine, 'L', 0));
            wineQuota -= totalWine;
        }

        // Beer0
        let beerQuota = 2 + wineQuota;

        if (totalBeer > beerQuota){ // Too much beer
            freeItems.push(createAlcoholAndTobacco('Beer', 'beerCanBig', beerQuota, 'L', 0));
            payItems.push(createAlcoholAndTobacco('Beer', 'beerCanBig', totalBeer-beerQuota, 'L', 0));
            beerQuota = 0;
        } else if (totalBeer < beerQuota && totalBeer !== 0){
            freeItems.push(createAlcoholAndTobacco('Beer', 'beerCanBig', totalBeer, 'L', 0));
            beerQuota -= totalBeer;
        }

        // Alcopop
        if (totalAlcopop > beerQuota){ // Too much alcopop
            if (beerQuota !== 0) {
                freeItems.push(createAlcoholAndTobacco('Alcopop and others', 'beerCanBig', beerQuota, 'L', 0));
            }
            payItems.push(createAlcoholAndTobacco('Alcopop and others', 'beerCanBig', totalAlcopop-beerQuota, 'L', 0));
        } else if (totalAlcopop < beerQuota && totalAlcopop !== 0){
            freeItems.push(createAlcoholAndTobacco('Alcopop and others', 'beerCanBig', totalAlcopop, 'L', 0));
        }


        // Cigarette papers
        if (totalPaper > 200) {
            freeItems.push(createAlcoholAndTobacco('Cigarette paper and sheets', 'cigarettePaper', 200, 'sheets', 0));
            if(totalPaper-200 > 0) payItems.push(createAlcoholAndTobacco('Cigarette paper and sheets', 'cigarettePaper',
                totalPaper - 200, 'sheets', 0));
        } else {
            if (totalPaper > 0) {
                freeItems.push(createAlcoholAndTobacco('Cigarette paper and sheets', 'cigarettePaper',
                    totalPaper, 'sheets', 0));
            }
        }


        // Tobacco
        if (tooMuchTobacco(totalCigarettes, totalSnuff, totalSmoking, totalCigars)) {
            if (totalCigarettes >= 200) { //More than quota
                freeItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', 200, 'pieces', 0));
                if (totalCigarettes !== 200)
                    payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes - 200, 'pieces', 0));
                if (totalSnuff > 0) payItems.push(createAlcoholAndTobacco('Snuff and chewing tobacco', 'snus', totalSnuff, 'g', 0));
                if (totalSmoking > 0) payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 0));
                if (totalCigars > 0) payItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', totalCigars, 'g', 0));

            }  else if (totalSmoking >= 250) {
                freeItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', 250, 'g', 0));
                if (totalSmoking !== 250)
                    payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking - 250, 'g', 0));
                if (totalCigarettes > 0) payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'g', 0));
                if (totalSnuff > 0) payItems.push(createAlcoholAndTobacco('Snuff and chewing tobacco', 'snus', totalSnuff, 'g', 0));
                if (totalCigars > 0) payItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', totalCigars, 'g', 0));

            } else if (totalCigars >= 250) {
                freeItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', 250, 'g', 0));
                if (totalCigars !== 250)
                    payItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', totalCigars - 250, 'g', 0));
                if (totalCigarettes > 0) payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'g', 0));
                if (totalSmoking > 0) payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 0));
                if (totalSnuff > 0) payItems.push(createAlcoholAndTobacco('Snuff and chewing tobacco', 'snus', totalSnuff, 'g', 0));

            } else if (totalSnuff >= 250) {
                freeItems.push(createAlcoholAndTobacco('Snuff and chewing tobacco', 'snus', 250, 'g',0));
                if (totalSnuff !== 250)
                    payItems.push(createAlcoholAndTobacco('Snuff and chewing tobacco', 'snus', totalSnuff - 250, 'g', 0));
                if (totalCigarettes > 0) payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'g', 0));
                if (totalSmoking > 0) payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 0));
                if (totalCigars > 0) payItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', totalCigars, 'g', 0));

            } else {
                let tobaccoItems = [{name: "Cigarettes", amount: totalCigarettes, icon: "cigarettes"},
                    {name: "Snuff and chewing tobacco", amount: totalSnuff, icon: "snus"},
                    {name: "Smoking tobacco", amount: totalSmoking, icon: "pipe"},
                    {name: "Cigars and Cigarillos", amount: totalCigars, icon: "cigar"}]
                    .sort(function(a, b) {return b.amount - a.amount;});

                if (tobaccoItems[0] === "Cigarettes"){ /* if we have most cigarettes */
                    freeItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'pieces', 0));
                    if (totalSnuff > 0) payItems.push(createAlcoholAndTobacco('Snuff and chewing tobacco', 'snus', totalSnuff, 'g', 0));
                    if (totalSmoking > 0) payItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 0));
                    if (totalCigars > 0) payItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', totalCigars, 'g', 0));

                } else{
                    let valueLimit = 250;
                    let currentAmount = 0;
                    for (let i = 0; i < tobaccoItems.length; i++) {
                        if (tobaccoItems[i].name === "Cigarettes" && tobaccoItems[i].amount > 0){
                            payItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'g', 0));
                        } else {
                            if (tobaccoItems[i].amount + currentAmount <= valueLimit && tobaccoItems[i].amount > 0){
                                freeItems.push(createAlcoholAndTobacco(tobaccoItems[i].name, tobaccoItems[i].icon, tobaccoItems[i].amount, 'g', 0));
                                currentAmount += tobaccoItems[i].amount;
                            } else if (tobaccoItems[i].amount > 0){
                                payItems.push(createAlcoholAndTobacco(tobaccoItems[i].name, tobaccoItems[i].icon, tobaccoItems[i].amount, 'g', 0));
                            }

                        }
                    }
                }


            }

        } else {
            if (totalCigarettes > 0) freeItems.push(createAlcoholAndTobacco('Cigarettes', 'cigarettes', totalCigarettes, 'pieces', 0));
            if (totalSnuff > 0) freeItems.push(createAlcoholAndTobacco('Snuff and chewing tobacco', 'snus', totalSnuff, 'g', 0));
            if (totalSmoking > 0) freeItems.push(createAlcoholAndTobacco('Smoking tobacco', 'pipe', totalSmoking, 'g', 0));
            if (totalCigars > 0) freeItems.push(createAlcoholAndTobacco('Cigars and Cigarillos', 'cigar', totalCigars, 'g', 0));
        }

        calculateFeesAndVAT(payItems);

        this.setState({
            freeItems: freeItems,
            payItems: payItems,
            totalAmounts: {
                litersOfAlcohol: totalBeer + totalWine + totalAlcopop + totalFortifiedWine,
                litersOfSpirits: totalSpirit,
                gramsOfTobacco: totalSnuff + totalSmoking + totalCigars,
                piecesOfCigarettes: totalCigarettes,
                papers: totalPaper,
            },
        })
    }
}

function tooMuchTobacco(cigarettes, snuff, smoking, cigars){
    let otherTobacco = snuff + smoking + cigars;
    return !((otherTobacco === 0 && cigarettes <= 200) || (cigarettes === 0 && otherTobacco <= 250));
}


export default withRouter(ShoppingCart);