import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid/Grid";
import TotalTable from "./TotalTable";
import SubTable from "./SubTable";

class DeclarationTable extends Component{

    render = () => {
        const {items, payItems, freeItems} = this.props
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

                    <SubTable isPayTable={true} payItems={payItems} freeItems={freeItems}/>
                    <SubTable isPayTable={false} payItems={payItems} freeItems={freeItems}/>

                </Paper>
                <Paper className={'paper'} style={{marginTop: "20px"}}>
                    <TotalTable totalSum={1400} route={'/checkout'}/>
                </Paper>
            </div>
        )
    };
}

export default withRouter(DeclarationTable);