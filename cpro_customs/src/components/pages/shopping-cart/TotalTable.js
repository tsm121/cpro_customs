import React, {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import {withRouter} from "react-router-dom";


class TotalTable extends Component{
    render = () => {
        const { totalSum } = this.props
        return(
            <div>
                <Grid container
                      direction={"column"}
                      alignItems={"center"}
                      justify={"center"}
                >
                    <Grid item xs={12} sm={12} md={12} >
                        <h4 className={"cdp total_text"}>
                            {'Total: ' + totalSum + ' NOK'}
                        </h4>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <Button className={"declaration_button"} size={"medium"}
                                onClick={this.onClick}
                                onMouseOver={this.onMouseOver}
                                onMouseOut={this.onMouseOut}
                        >
                            <h4 className={"cdp cdp_yellow declaration_button_text"}>
                                Declare items
                            </h4>
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }


    onClick = () => {
        this.props.history.push(this.props.route);
    };

    onMouseOver = () => {
        document.body.style.cursor = "pointer";
    };

    onMouseOut = () => {
        document.body.style.cursor = "default";
    };
}

export default withRouter(TotalTable);