import React, {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import {withRouter} from "react-router-dom";
import {GlobalState} from "../../context/GlobalState";


class TotalTable extends Component{
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        disablePayButton : true,
    }


    render = () => {
        const {disablePayButton} = this.props
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
                                    {'Total: ' + globalState.amount_to_pay.toFixed(0) + ' NOK'}
                                </h4>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                                <Button className={"declaration_button"}
                                        size={"medium"}
                                        disabled={disablePayButton}
                                        onClick={this.onClick}
                                        onMouseOver={this.onMouseOver}
                                        onMouseOut={this.onMouseOut}
                                        role="button"
                                        type="submit"
                                        value="declare your items"
                                >
                                    <h4 className={disablePayButton ? "cdp cdp_grey declaration_button_text" : "cdp cdp_grey declaration_button_text"}
                                    >
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
        const {onClickValidate, payItems} = this.props;

        onClickValidate();
        if (payItems.length === 0) {
            // route directly to end page as the customer does not have anything to declare
            this.props.history.push('/endpage');
        } else {
            this.props.history.push('/checkout');
        }
    };

}

export default withRouter(TotalTable);