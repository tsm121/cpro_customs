import React from 'react'

export const validateData = (allData, isPay) => {
    console.log("fetching")

    const username = "react";
    const password = "f$rSn6ydLk3s6XM3nJQ#17bqgfD0i";

    if (isPay) {
        //.../api/backend/transaction/validate/
        return fetch("https://toll.idi.ntnu.no/api/backend/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
            },
            body: JSON.stringify(allData)
        }).then(promise => promise.json())
            .then(getUrl => {
                console.log(getUrl.url)
                return getUrl.url
            })
    } else { //just validation
        return fetch("https://toll.idi.ntnu.no/api/backend/transaction/validate/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
            },
            body: JSON.stringify(allData)
        }).then(promise => promise.json())
            .then(response => {
                console.log(response)
                return response
            })
    }
}