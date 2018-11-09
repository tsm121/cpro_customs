import React, { Component } from 'react'

import Grid from "@material-ui/core/Grid/Grid";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Receipt from "./Receipt";

export default class Endpage extends Component {
    render = () => {
        //TODO: Uncomment this when QR_url gets sent as a prop from checkout
        //const {QR_url} = this.props
        //TODO: Remove this when sending QR_url from checkout
        const QR_url = "http://google.com"


        let receipt_block

        if (QR_url !== undefined) {

            if(QR_url.length >= 0){
                receipt_block = <Grid item
                >
                    <Receipt QR_url={QR_url}/>
                </Grid>
            }

        } else {
            receipt_block = ""
        }
        return(

            <FormControl fullWidth={true}>
                <Grid container
                      spacing={0}
                      justify="center"
                      alignItems="center"
                      direction="column"
                >
                    <Grid item>
                        <h1 className={"h1Style"}>
                            Thank you for your time.
                        </h1>
                    </Grid>
                    <Grid item
                    >
                        <h1 className={"h1Style_secondary_big"}>
                            Welcome to Norway!
                        </h1>
                    </Grid>

                    {receipt_block}
                </Grid>
            </FormControl>
        )
    }
}