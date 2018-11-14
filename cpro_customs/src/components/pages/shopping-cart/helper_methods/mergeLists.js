/**
 * Merges the two list together. The amount and the value of the merged items are the the sum of the merged ones
 * @param payItems
 * @param freeItems
 */
export const mergeLists = (payItems, freeItems) => {
    let payItemsCopy = JSON.parse(JSON.stringify(payItems));
    let freeItemsCopy = JSON.parse(JSON.stringify(freeItems));

    let totalList = [];
    for (let payItem of payItemsCopy) {
        for (let freeItem of freeItemsCopy) {
            if (payItem.type === freeItem.type && payItem.name === freeItem.name) {
                let mergedItem = {...payItem, ...freeItem};
                mergedItem.amount = payItem.amount + freeItem.amount;
                mergedItem.value = parseInt(payItem.value, 10) + parseInt(freeItem.value, 10);
                totalList.push(mergedItem);
                payItemsCopy = payItemsCopy.filter(item => item !== payItem);
                freeItemsCopy = freeItemsCopy.filter(item => item !== freeItem);
            }
        }
    }
    return [...payItemsCopy, ...freeItemsCopy, ...totalList]
}