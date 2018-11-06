import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import {withRouter} from "react-router-dom";
import DeclarationTable from "./DeclarationTable";

let id = 0;
function createRows(product, filename, amount, unit, value, vat, duty) {
    id++;
    return {id, product, filename, amount, unit, value, vat, duty};
}

class ShoppingCart extends Component {
    state = {
        items: [
            createRows('Bought a dog abroad', 'dog_dark_grey', 2, "", 18000, 4500, 0),
            createRows('Meat', 'diet', 5, "kg", 4420, 200, 0),
            createRows('Wine', 'glass-and-bottle-of-wine', 2, 'L', 0.75, 0, 0),
            createRows('Wine', 'glass-and-bottle-of-wine', 4, 'L', 1.5, 0, 0),
            createRows('Spirit', 'glass-and-bottle-of-wine', 2, "L", 1, 0, 0),
            createRows('Fortified wine', 'glass-and-bottle-of-wine', 2, 'L', 0.75, 0, 0),
            createRows('Cigarettes', 'glass-and-bottle-of-wine', 200, 'pieces', 1, 0, 0),
            createRows('Snuff & chewing Tobacco', 'glass-and-bottle-of-wine', 100, 'g', 1, 0, 0),
        ],
        freeItems: [],
        payItems: []
    };

    componentDidMount (){
        // const {globalState} = this.props
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
            freeItems.push(createRows('Spirit', 'glass-and-bottle-of-wine', 1, "L", 1, 0, 0));
            payItems.push(createRows('Spirit', 'glass-and-bottle-of-wine', totalSpirit - 1, "L", 1, 0, 0));
        } else if (totalSpirit <= 1){ //Everything is under the quota
            if (totalSpirit > 0) {
                freeItems.push(createRows('Spirit', 'glass-and-bottle-of-wine', totalSpirit, "L", 1, 0, 0));
                wineQuota += 1 - totalSpirit; // see rules above
            }
        }

        // Wine
        if (totalWine > wineQuota){ //Too much wine
            freeItems.push(createRows('Wine', 'glass-and-bottle-of-wine', wineQuota, 'L', 1, 0, 0));
            payItems.push(createRows('Wine', 'glass-and-bottle-of-wine', totalWine-wineQuota, 'L', 1, 0, 0));
            wineQuota = 0;
        } else if (totalWine <= wineQuota && totalWine !== 0) {
            freeItems.push(createRows('Wine', 'glass-and-bottle-of-wine', totalWine, 'L', 1, 0, 0));
            wineQuota -= totalWine;
        }

        // Fortified wine
        if (totalFortifiedWine > wineQuota){ //Too much fortified wine
            if (wineQuota !== 0){
                freeItems.push(createRows('Fortified wine', 'glass-and-bottle-of-wine', wineQuota, 'L', 1, 0, 0));
            }
            payItems.push(createRows('Fortified wine', 'glass-and-bottle-of-wine', totalFortifiedWine-wineQuota, 'L', 1, 0, 0));
            wineQuota = 0;
        } else if (totalFortifiedWine <= wineQuota && totalFortifiedWine !== 0) {
            freeItems.push(createRows('Fortified wine', 'glass-and-bottle-of-wine', totalFortifiedWine, 'L', 1, 0, 0));
            wineQuota -= totalWine;
        }

        // Beer
        let beerQuota = 2 + wineQuota;

        if (totalBeer > beerQuota){ // Too much beer
            freeItems.push(createRows('Beer', 'glass-and-bottle-of-wine', beerQuota, 'L', 1, 0, 0));
            payItems.push(createRows('Beer', 'glass-and-bottle-of-wine', totalBeer-beerQuota, 'L', 1, 0, 0));
            beerQuota = 0;
        } else if (totalBeer < beerQuota && totalBeer !== 0){
            freeItems.push(createRows('Beer', 'glass-and-bottle-of-wine', totalBeer, 'L', 1, 0, 0));
            beerQuota -= totalBeer;
        }

        // Alcopop
        if (totalAlcopop > beerQuota){ // Too much alcopop
            if (beerQuota !== 0) {
                freeItems.push(createRows('Alcopop and others', 'glass-and-bottle-of-wine', beerQuota, 'L', 1, 0, 0));
            }
            payItems.push(createRows('Alcopop and others', 'glass-and-bottle-of-wine', totalAlcopop-beerQuota, 'L', 1, 0, 0));
        } else if (totalAlcopop < beerQuota && totalAlcopop !== 0){
            freeItems.push(createRows('Alcopop and others', 'glass-and-bottle-of-wine', totalAlcopop, 'L', 1, 0, 0));
        }


        // Tobacco
        if (tooMuchTobacco(totalCigarettes, totalSnuff, totalSmoking, totalCigars)) {
            if (totalCigarettes >= 200) { //More than quota
                freeItems.push(createRows('Cigarettes', 'glass-and-bottle-of-wine', 200, 'pieces', 1, 0, 0));
                if (totalCigarettes !== 200)
                    payItems.push(createRows('Cigarettes', 'glass-and-bottle-of-wine', totalCigarettes - 200, 'pieces', 1, 0, 0));
                if (totalSnuff > 0) payItems.push(createRows('Snuff & chewing Tobacco', 'glass-and-bottle-of-wine', totalSnuff, 'g', 1, 0, 0));
                if (totalSmoking > 0) payItems.push(createRows('Smoking tobacco', 'glass-and-bottle-of-wine', totalSmoking, 'g', 1, 0, 0));
                if (totalCigars > 0) payItems.push(createRows('Cigars and cigarillos', 'glass-and-bottle-of-wine', totalCigars, 'g', 1, 0, 0));

            } else if (totalSnuff >= 250) {
                freeItems.push(createRows('Snuff & chewing Tobacco', 'glass-and-bottle-of-wine', 250, 'g', 1, 0, 0));
                if (totalSnuff !== 250)
                    payItems.push(createRows('Snuff & chewing Tobacco', 'glass-and-bottle-of-wine', totalSnuff - 250, 'g', 1, 0, 0));
                if (totalCigarettes > 0) payItems.push(createRows('Cigarettes', 'glass-and-bottle-of-wine', totalCigarettes, 'g', 1, 0, 0));
                if (totalSmoking > 0) payItems.push(createRows('Smoking tobacco', 'glass-and-bottle-of-wine', totalSmoking, 'g', 1, 0, 0));
                if (totalCigars > 0) payItems.push(createRows('Cigars and cigarillos', 'glass-and-bottle-of-wine', totalCigars, 'g', 1, 0, 0));

            } else if (totalSmoking >= 250) {
                freeItems.push(createRows('Smoking tobacco', 'glass-and-bottle-of-wine', 250, 'g', 1, 0, 0));
                if (totalSmoking !== 250)
                    payItems.push(createRows('Smoking tobacco', 'glass-and-bottle-of-wine', totalSmoking - 250, 'g', 1, 0, 0));
                if (totalCigarettes > 0) payItems.push(createRows('Cigarettes', 'glass-and-bottle-of-wine', totalCigarettes, 'g', 1, 0, 0));
                if (totalSnuff > 0) payItems.push(createRows('Snuff & chewing Tobacco', 'glass-and-bottle-of-wine', totalSnuff, 'g', 1, 0, 0));
                if (totalCigars > 0) payItems.push(createRows('Cigars and cigarillos', 'glass-and-bottle-of-wine', totalCigars, 'g', 1, 0, 0));

            } else if (totalCigars >= 250) {
                freeItems.push(createRows('Cigars and cigarillos', 'glass-and-bottle-of-wine', 250, 'g', 1, 0, 0));
                if (totalCigars !== 250)
                    payItems.push(createRows('Cigars and cigarillos', 'glass-and-bottle-of-wine', totalCigars - 250, 'g', 1, 0, 0));
                if (totalCigarettes > 0) payItems.push(createRows('Cigarettes', 'glass-and-bottle-of-wine', totalCigarettes, 'g', 1, 0, 0));
                if (totalSmoking > 0) payItems.push(createRows('Smoking tobacco', 'glass-and-bottle-of-wine', totalSmoking, 'g', 1, 0, 0));
                if (totalSnuff > 0) payItems.push(createRows('Snuff & chewing Tobacco', 'glass-and-bottle-of-wine', totalSnuff, 'g', 1, 0, 0));
            }

        } else {
            if (totalCigarettes > 0) freeItems.push(createRows('Cigarettes', 'glass-and-bottle-of-wine', totalCigarettes, 'pieces', 1, 0, 0));
            if (totalSnuff > 0) freeItems.push(createRows('Snuff & chewing Tobacco', 'glass-and-bottle-of-wine', totalSnuff, 'g', 1, 0, 0));
            if (totalSmoking > 0) freeItems.push(createRows('Smoking tobacco', 'glass-and-bottle-of-wine', totalSmoking, 'g', 1, 0, 0));
            if (totalCigars > 0) freeItems.push(createRows('Cigars and cigarillos', 'glass-and-bottle-of-wine', totalCigars, 'g', 1, 0, 0));
        }

        console.log(freeItems)
        console.log(payItems)

        {this.setFreeAndPayItems(freeItems, payItems)}

    }

    setFreeAndPayItems (newFreeItems, newPayItems){
        this.setState({
            freeItems: newFreeItems,
            payItems: newPayItems,
        })
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


