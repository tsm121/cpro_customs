import React, {Component} from "react";

import PageTitle from "../PageTitle";

import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import ImgBadge from "../../../ImgBadge";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from "@material-ui/core/Button/Button";
import Good from "./Good";


class Goods extends Component {
    render = () => {
        return (
            <div>
                <PageTitle title={"Goods"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={"32"}
                      direction={"column"}>
                    <Good/>
                    <Good/>
                    <Good/>
                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <Grid container justify={"center"} alignItems={"center"}>
                                    <Button className={"cdp_button_round"} variant="fab" color="primary">
                                        <AddIcon/>
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justify={"center"} alignItems={"center"}>
                                    <span>Add good</span>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Goods.propTypes = {
    // classes: PropTypes.object.isRequired,
};

export default Goods;