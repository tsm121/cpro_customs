import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default class LangButton extends Component  {
    render = () => {
        const {text, countryName, disabled} = this.props
        return (
            <Button
                className={"flag_button"}
                disabled={disabled}
                role="button"
                type="submit"
                value={"change language " + {countryName}}
            >
                <Grid container
                      direction={"column"}
                      justify={"center"}
                      alignItems={"center"}
                >
                    <Grid item className={"flag_container"}
                          xs={12}
                          sm={12}
                          md={12}
                    >
                        <Avatar
                            src={require(`assets/header/lang_icons/${countryName}.png`)}
                            className={"flag_img"}
                            style={disabled ? {filter: "greyscale(100%)",WebkitFilter: "grayscale(100%)"} : {}}
                        />
                    </Grid>
                    <Grid item
                          xs={12}
                          sm={12}
                          md={12}
                    >
                        <h3 className={"flag_name"}>
                            {text}
                        </h3>
                    </Grid>
                </Grid>
            </Button>
        )
    }
}