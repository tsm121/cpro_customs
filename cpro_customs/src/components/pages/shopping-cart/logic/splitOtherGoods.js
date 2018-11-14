export const splitOtherGoods = (globalState, other) => {
    // Add the rest of the items to either freeList or payList
    let valueLimit = 3000;
    if (globalState.overADay) valueLimit = 6000;

    let freeItems = [];
    let payItems = [];

    let currentValue = 0;
    for (let item of other){
        if (parseInt(item.value, 10) > valueLimit){
            payItems.push(item);
        } else {
            if (item.amount > 1){
                // have more of the same item
                let amountLeft = item.amount;
                while (amountLeft > 0){
                    if (amountLeft * parseInt(item.value, 10) + currentValue <= valueLimit){
                        let freeItem = JSON.parse(JSON.stringify(item));
                        freeItem.amount = amountLeft;
                        freeItems.push(freeItem);
                        currentValue += amountLeft * parseInt(item.value, 10);

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
                if (parseInt(item.value, 10) + currentValue <= valueLimit) {
                    freeItems.push(item);
                    currentValue += parseInt(item.value, 10);
                } else {
                    payItems.push(item);
                }
            }
        }
    }

    return [freeItems, payItems]
}