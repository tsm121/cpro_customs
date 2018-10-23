import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconAndAmount from "./IconAndAmount";
import RemoveButton from "./RemoveButton";
import Grid from "@material-ui/core/Grid/Grid";
import TotalTable from "./TotalTable";

class DeclarationTable extends Component{

    render = () => {
        const {items} = this.props
        return(
            <div>
                <Paper className={"paper"}>
                    <Grid container
                          alignItems={"center"}
                          justify={"center"}
                    >
                        <Grid item xs={12} sm={12} md={12}>
                            <h3 className={"cdp cdp_dark_grey declaration_table_header"}>
                                Items you are bringing with you
                            </h3>
                        </Grid>
                    </Grid>

                    <Table className={"declaration_table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell key={"icon"} className={"picture_column"}> </TableCell>
                                <TableCell key={"item"} className={"table_column category_column"}>Category</TableCell>
                                <TableCell numeric key={"value"} className={"table_column"}>Value</TableCell>
                                <TableCell numeric key={"vat"} className={"table_column"}>VAT</TableCell>
                                <TableCell numeric key={"duty"} className={"table_column"}>Fee</TableCell>
                                <TableCell key={"delete"} className={"exit_column"}> </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {items.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row" className={"picture_column"}>
                                            <IconAndAmount filename={row.filename} amount={row.amount} unit={row.unit}/>
                                        </TableCell>
                                        <TableCell className={"table_column category_column"}>{row.category}</TableCell>
                                        <TableCell numeric className={"table_column"}>{row.value} kr</TableCell>
                                        <TableCell numeric className={"table_column"}>{row.vat} kr</TableCell>
                                        <TableCell numeric className={"table_column"}>{row.duty} kr</TableCell>
                                        <TableCell numeric className={"exit_column"} padding={"none"}>
                                            <RemoveButton onClick={() => this.props.onDelete(row.id)} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            };
                        </TableBody>
                    </Table>
                </Paper>
                <Paper className={'paper'} style={{marginTop: "20px"}}>
                    <TotalTable totalSum={1400} route={'/checkout'}/>
                </Paper>
            </div>
        )
    };
}

export default withRouter(DeclarationTable);