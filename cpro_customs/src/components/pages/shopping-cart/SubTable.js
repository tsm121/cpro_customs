import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import IconAndAmount from "./IconAndAmount";
import RemoveButton from "./RemoveButton";
import Table from "@material-ui/core/Table/Table";
import PropTypes from 'prop-types';
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {GlobalState} from "../../global_state/GlobalState";
import Button from "@material-ui/core/Button/Button";


class SubTable extends Component{
    render = () => {
        const { isPayTable, payItems, freeItems } = this.props
        return(
            <div>
                <GlobalState.Consumer>
                    {cart => (
                        <div>
                            <h4 className={"cdp cdp_dark_grey declaration_table_sub_header"}>
                                Items <span className={"cdp_yellow"}> {isPayTable ? "over" : "under"} </span>the quota:
                            </h4>

                            <Table className={"declaration_table"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell key={"icon"} className={"picture_column"}> </TableCell>
                                        <TableCell key={"item"} className={"table_column category_column"}>Category</TableCell>
                                        <TableCell numeric key={"value"} className={"table_column"}>Value</TableCell>
                                        <TableCell numeric key={"vat"} className={"table_column"}>{isPayTable ? "VAT" : ""}</TableCell>
                                        <TableCell numeric key={"duty"} className={"table_column"}>{isPayTable ? "Fee" : ""}</TableCell>
                                        <TableCell key={"delete"} className={"exit_column"}> </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <Button onClick={() => cart.addGoodToCart('kitchen', 5000, 'NOK', 1)}> Add Good</Button>
                                    {(this.renderItems()).map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell component="th" scope="row" className={"picture_column"}>
                                                <IconAndAmount filename={item.filename} amount={item.amount} unit={item.unit}/>
                                            </TableCell>
                                            <TableCell className={"table_column category_column"}>{item.category}</TableCell>
                                            <TableCell numeric className={"table_column"}>{item.value} kr</TableCell>
                                            <TableCell numeric className={"table_column"}>{isPayTable ? item.vat + " kr" : ""}</TableCell>
                                            <TableCell numeric className={"table_column"}>{isPayTable ? item.duty + " kr" : ""}</TableCell>
                                            <TableCell numeric className={"exit_column"} padding={"none"}>
                                                <RemoveButton onDelete={() => cart.onRemoveFromCart(index)} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    };
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </GlobalState.Consumer>
            </div>
        )
    }

    renderItems = () => {
        const {isPayTable, payItems, freeItems} = this.props
        if(isPayTable) {
            return payItems

        } else {
            return freeItems
        }
    }
}

SubTable.propTypes = {
    isPayTable: PropTypes.bool.isRequired,
    payItems: PropTypes.array.isRequired,
    freeItems: PropTypes.array.isRequired
};

export default withRouter(SubTable);