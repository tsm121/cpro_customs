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

                        <p className={"modal_paragraph"}>This application stores your e-mail and<br/> licence plate locally on your unit.</p>
                        <p className={"modal_paragraph"}> This information, together with your registered email is used by the Norwegian Customs to match your declaration with your car when crossing the border.</p>

                    </Grid>

                    <Grid item>

                        <Grid container
                              direction={"row"}
                              spacing={16}
                        >

                            <Grid item>
                                <Button
                                    onClick={closeModal}
                                    variant={"contained"}
                                    color={"primary"}
                                    role="button"
                                    type="submit"
                                    value="I-agree"
                                    size={"large"}
                                >
                                    I agree
                                </Button>
                            </Grid>

                            <Grid item>

                                <Button href={"https://www.toll.no/en/"}
                                        variant={"contained"}
                                        color={"secondary"}
                                        role="button"
                                        type="submit"
                                        value="i-dont-agree"
                                        size={"large"}
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