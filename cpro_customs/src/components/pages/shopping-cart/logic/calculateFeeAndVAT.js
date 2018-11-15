/**
 * Adds parameters/keys  for fee and VAT in every item that needs to be paid for
 @param: payItems - The local state list containing all the items the user must pay for
 */
export const calculateFeesAndVAT = (payItems) => {
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

    Horse (not from EU):    5000 kr per horse
    All other use cases:    25 % VAT and no fee
    --------------------------------------------
    */
    for (let item of payItems){
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
            case "Snuff and chewing tobacco":
                item.fee = item.amount/100 * 120;
                break;
            case "Cigarette paper and sheets":
                item.fee = item.amount/100 * 5;
                break;
            case "Bought Animal":
                if (item.kind === "horse" && !item.horseHasOriginInEU){
                    item.fee = 5000 * item.amount; // 5000 fee per horse
                }
                item.vat = 0.25 * parseInt(item.value, 10) * item.amount;
                break;
            default:
                item.vat = 0.25 * parseInt(item.value, 10) * item.amount;
                break;
        }
    }
    return payItems;
};