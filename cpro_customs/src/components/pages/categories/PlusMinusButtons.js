import React, {Component} from 'react';
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


class PlusMinusButtons extends Component {

    render = () => {
        const {showMinusButton, showPlusButton, showPlusFiveButton} = this.props;
        return (
            <Grid container justify={"center"} alignItems={"center"} spacing={0} >
                {
                    showMinusButton ?
                        <Grid item >
                            <Button
                                className={"cdp_button_round_decrement"}
                                variant="fab"
                                color="primary"
                                onClick={this.props.handleDecrement}
                            >
                                <RemoveIcon className={"add_remove_icon"}/><span className={"cdp_icon_round_label"}>1</span>
                            </Button>
                        </Grid>
                        :
                        ""
                }
                {
                    showPlusButton ?
                        <Grid item>
                            <Button
                                className={"cdp_button_round"}
                                variant="fab"
                                color="primary"
                                onClick={this.props.handleIncrement}
                            >
                                <AddIcon className={"add_remove_icon"}/><span className={"cdp_icon_round_label"}>1</span>
                            </Button>
                        </Grid>
                        :
                        ""
                }
                {
                    showPlusFiveButton ?
                        <Grid item>
                            <Button
                                className={"cdp_button_round"}
                                variant="fab"
                                color="primary"
                                onClick={this.props.handlePlusFive}
                            >
                                <AddIcon className={"add_remove_icon"}/><span className={"cdp_icon_round_label"}>5</span>
                            </Button>
                        </Grid>
                        :
                        ""
                }
            </Grid>
        );
    };
}

PlusMinusButtons.defaultProps = {
    showMinusButton: true,
    showPlusButton: true,
    showPlusFiveButton: true,
};


PlusMinusButtons.propTypes = {
    showMinusButton: PropTypes.bool,
    showPlusButton: PropTypes.bool,
    showPlusFiveButton: PropTypes.bool,
    handleDecrement: PropTypes.func,
    handleIncrement: PropTypes.func,
    handlePlusFive: PropTypes.func,
};

export default PlusMinusButtons;