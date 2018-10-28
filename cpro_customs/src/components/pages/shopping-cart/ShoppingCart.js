import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import {withRouter} from "react-router-dom";
import DeclarationTable from "./DeclarationTable";

let id = 0;
function createRows(category, filename, amount, unit, value, vat, duty) {
    id++;
    return {id, category, filename, amount, unit, value, vat, duty};
}


class ShoppingCart extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                createRows('Bought a dog abroad', 'dog_dark_grey', 1, "", 10000, 2500, 0),
            ]
        };
        this.deleteItem = this.deleteItem.bind(this);
    }


    render = () => {
        return (
            <div>
                <Grid container
                      direction={'column'}
                      justify={'center'}
                      alignItems={'center'}
                >
                    <Grid item xs={12} sm={12} md={12}>
                        <h3 className={"cdp shopping_cart_title"}>
                            Declaration <span className={"cdp_yellow"}> list </span>
                        </h3>
                    </Grid>

                    <Grid item >
                        <DeclarationTable
                            items={this.state.items}
                            onDelete={ this.deleteItem }/>
                    </Grid>
                </Grid>
            </div>
        )
    }

    deleteItem(id) {
        this.setState((prevState) => ({
            items: prevState.items.filter(item => item.id !== id),
        }))
    };

}

export default withRouter(ShoppingCart);