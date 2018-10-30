import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";


export default class CookieNotification extends Component  {
    render = () => {
        const { closeModal } = this.props
        return (

            <div className={'modal'}>

                <Grid container spacing={24}
                      justify={"center"}
                      alignItems={"center"}
                      direction={"column"}
                >
                    <Grid item
                    >
                        <h4 className={"modal_title cdp"}>
                            Privacy Policy
                        </h4>
                    </Grid>

                    <Grid item>

                        <p>This application stores your e-mail and<br/> licence plate locally on your unit.</p>
                        <p> This information is used by the Norwegian Customs<br/> to match your declaration with your car when crossing the border.</p>

                    </Grid>

                    <Grid item>

                        <Grid container
                              direction={"row"}
                              spacing={32}
                        >

                            <Grid item>
                                <Button
                                    onClick={closeModal}
                                    variant={"contained"}
                                    color={"primary"}
                                >
                                    I agree
                                </Button>
                            </Grid>

                            <Grid item>

                                <Button href={"https://www.toll.no/en/"}
                                        variant={"contained"}
                                        color={"secondary"}
                                >
                                    I don't agree
                                </Button>

                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>

            </div>
        )
    }
}