/**
 * Takes a list of products and fixes the format so that it matches the API
 * @param productList
 * @returns copy of productList containing the correct formatting for the API
 */
export const fixFormatting = (productList) => {
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
        if (typeof item.value === "string") parseInt(item.value, 10);
        item.value = item.value * item.amount;

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

    return productListCopy
}