import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';

export default class Welcome extends Component  {
    render = () => {
        return (
            <Grid container
                  justify="center"
                  alignItems="center"
                  direction="column"
            >
                <Grid item>
                    <h2 className={"cdp cdp_primary"}>
                        You are approaching the Norwegian border
                    </h2>
                </Grid>
                <Grid item>
                    <h1 className={"cdp cdp_secondary"}>
                        Please declare your goods
                    </h1>
                </Grid>
            </Grid>
        )
    }
}
