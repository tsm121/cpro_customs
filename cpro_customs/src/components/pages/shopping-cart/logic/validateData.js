import React from 'react'

export const validateData = (allData) => {
    console.log(allData)

    console.log("fetching")

    const username = "react";
    const password = "f$rSn6ydLk3s6XM3nJQ#17bqgfD0i";


    fetch("https://toll.idi.ntnu.no/api/backend/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
        },
        body: JSON.stringify(allData)
    }).then(promise => promise.json())
        .then(getUrl => console.log(getUrl.url))
}