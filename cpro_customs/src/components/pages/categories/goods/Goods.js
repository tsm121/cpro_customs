import React, {Component} from "react";

import Grid from "@material-ui/core/Grid/Grid";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button/Button";

import PageTitle from "../PageTitle";
import Good from "./Good";


class Goods extends Component {
    state = {
        additionalGoods: 0,
    };

    render = () => {
        return (
            <div>
                <PageTitle title={"Goods"}/>
                <Grid container
                      justify={"center"}
                      alignItems={"center"}
                      spacing={32}
                      direction={"column"}>
                    <Good autoFocus={true}/>
                    {
                        this.drawAdditionalGoods()
                    }
                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container spacing={8} onClick={this.handleAddGood}>
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
    };

    handleAddGood = () => {
        this.setState({
            additionalGoods: this.state.additionalGoods + 1
        })
    };

    drawAdditionalGoods = () => {
        let goods = [];
        for (let i = 0; i < this.state.additionalGoods; i++) {
            goods.push(<Good/>);
        }
        return goods;
    }
}

//Goods.propTypes = {
// classes: PropTypes.object.isRequired,
//};

export default Goods;