import React, {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import {withRouter} from "react-router-dom";
import {GlobalState} from "../../context/GlobalState";


class TotalTable extends Component{
    render = () => {
        return(
            <GlobalState.Consumer>
                {globalState => (
                    <div>
                        <Grid container style={{marginBottom: '30px'}}
                              direction={"column"}
                              alignItems={"center"}
                              justify={"center"}
                        >
                            <Grid item xs={12} sm={12} md={12} >
                                <h4 className={"cdp total_text"}>
                                    {'Total: ' + globalState.amount_to_pay + ' NOK'}
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
                )}
            </GlobalState.Consumer>
        )
    }


    onClick = () => {
        const {onClickValidate} = this.props;
        console.log(onClickValidate());
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