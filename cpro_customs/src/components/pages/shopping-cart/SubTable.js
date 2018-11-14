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
import {GlobalState} from "../../context/GlobalState";


class SubTable extends Component{
    render = () => {
        const { isPayTable } = this.props
        return(
            <GlobalState.Consumer>
                {globalState => (
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
                                    <TableCell numeric key={"fee"} className={"table_column"}>{isPayTable ? "Fee" : ""}</TableCell>
                                    <TableCell key={"delete"} className={"exit_column"}> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.renderItems()).map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell component="th" scope="row" className={"picture_column"}>
                                            <IconAndAmount icon={item.icon} amount={item.amount} unit={item.unit}/>
                                        </TableCell>
                                        <TableCell className={"table_column category_column"}>
                                            {item.type === "Goods" ? item.type + ": " + item.name : item.type}
                                        </TableCell>
                                        <TableCell numeric className={"table_column"}>{this.renderValue(item)}</TableCell>
                                        <TableCell numeric className={"table_column"}>{this.renderVAT(item)}</TableCell>
                                        <TableCell numeric className={"table_column"}>{this.renderFee(item)}</TableCell>
                                        <TableCell numeric className={"exit_column"} padding={"none"}>
                                            <RemoveButton onDelete={() => this.removeItem(index, globalState)} />
                                        </TableCell>
                                    </TableRow>
                                ))
                                };
                            </TableBody>
                        </Table>
                    </div>
                )}
            </GlobalState.Consumer>
        )
    }

    removeItem = (index, globalState) => {
        console.log(index)
    }

    renderItems = () => {
        const {isPayTable, payItems, freeItems} = this.props
        if(isPayTable) {
            return payItems

        } else {
            return freeItems
        }
    }

    renderValue = (item) => {
        let string = '';
        if (!this.isAlcoholOrTobacco(item.type)){
            string += item.value * item.amount + " ";
            if (item.currency !== undefined){
                string += item.currency
            } else {
                string += "NOK"
            }
        }
        return string;
    }

    renderVAT = (item) => {
        const {isPayTable} = this.props
        let string = '';
        if (isPayTable && !this.isAlcoholOrTobacco(item.type)){
            string += item.vat.toFixed(2) + " ";
            if (item.currency !== undefined){
                string += item.currency
            } else {
                string += "NOK"
            }
        }
        return string;
    }

    renderFee = (item) => {
        const {isPayTable} = this.props
        let string = '';
        if (isPayTable && item.fee !== undefined){
            string += item.fee.toFixed(2) + " ";
            if (item.currency !== undefined){
                string += item.currency
            } else {
                string += "NOK"
            }
        }
        return string;
    }

    isAlcoholOrTobacco = (type) => {
        switch (type) {
            case "Beer":
            case "Alcopop and others":
            case "Wine":
            case "Fortified wine":
            case "Spirits":
            case "Cigarettes":
            case "Snuff & chewing tobacco":
            case "Smoking tobacco":
            case "Cigars and Cigarillos":
            case "Cigarette paper and sheets":
                return true;
            default:
                return false;
        }
    }
}

SubTable.propTypes = {
    isPayTable: PropTypes.bool.isRequired,
    payItems: PropTypes.array.isRequired,
    freeItems: PropTypes.array.isRequired
};

export default withRouter(SubTable);