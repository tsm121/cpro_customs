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
                createRows('Bought a dog abroad', 'dog_dark_grey', 2, "", 18000, 4500, 0),
                createRows('Meat', 'diet', 5, "kg", 4420, 200, 0),
                createRows('Wine', 'glass-and-bottle-of-wine', 2, 'L', 350, 0, 0)
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