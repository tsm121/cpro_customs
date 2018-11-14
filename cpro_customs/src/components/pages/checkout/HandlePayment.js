import {Component} from "react";
import React from "react";

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import {Icon} from "@material-ui/core";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

export default class HandlePayment extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            success: false,
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleButtonClick = () => {
        const {paymentComplete} = this.props
        if (!this.state.loading) {
            this.setState(
                {
                    success: false,
                    loading: true,
                },
                () => {
                    this.timer = setTimeout(() => {
                        this.setState({
                            loading: false,
                            success: true,
                        });
                    }, 2500);
                },
            );
        }

        this.timer = setTimeout(() => {
            paymentComplete()
        }, 4000);
    };

    render = () => {
        const {loading, success} = this.state
        const {totalSum, selectedCurrency} = this.props
        return (
            <Grid container
                  direction={"row"}
                  justify={"center"}
                  alignItems={"center"}
                  className={"loading_container"}
            >
                <Grid item xs={12}>
                    <Grid container
                          direction={"row"}
                          justify={"center"}
                          alignItems={"center"}
                    >
                        <Button
                            disabled={true}
                            variant="fab"
                            color="primary"
                            style={Object.assign(
                                loading ? {display:"none"} : {display:"unset"},
                                success ? {backgroundColor:"#4CBB17"} : {display:"none"})}
                            role="button"
                            value="loading"
                        >
                            {success ?
                                <Icon className={"payment_button_icon"}>
                                    check
                                </Icon>
                                :
                                <Icon className={"payment_button_icon"}>
                                    error
                                </Icon>}
                        </Button>
                        {loading &&
                        <CircularProgress
                            size={68}
                            style={{color:"#4CBB17"}}
                        />}
                    </Grid>

                    <List
                        style={loading || success ? {display:"none"} : {display:"unset"}}
                    >
                        <ListItem button
                                  className={"payment_nav_button"}
                                  onClick={this.handleButtonClick}
                                  role="button"
                                  type="submit"
                                  value="pay-for-items"
                        >
                            <ListItemText
                                disableTypography={true}
                                className={"payment_nav_button_text"}
                                primary={"Pay (" + totalSum + " " + selectedCurrency +")"}

                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        )
    }
}