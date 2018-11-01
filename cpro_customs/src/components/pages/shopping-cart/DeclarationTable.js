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
import SubTable from "./SubTable";

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

                    <SubTable isPayTable={true} payItems={items}/>
                    <SubTable isPayTable={false} freeItems={items}/>

                </Paper>
                <Paper className={'paper'} style={{marginTop: "20px"}}>
                    <TotalTable totalSum={1400} route={'/checkout'}/>
                </Paper>
            </div>
        )
    };
}

export default withRouter(DeclarationTable);