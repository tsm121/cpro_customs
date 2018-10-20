import React, {Component} from 'react';
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


class PlusMinusButtons extends Component {
    render = () => {
        return (
            <Grid container spacing={16} justify={"center"} alignItems={"center"}>
                <Grid item>
                    <Button className={"cdp_button_round"}
                            variant="fab"
                            color="secondary"
                            onClick={this.props.handleDecrement}
                    >
                        <RemoveIcon/><span className={"cdp_icon_round_label"}>1</span>
                    </Button>
                </Grid>
                <Grid item>
                    <Button className={"cdp_button_round"}
                            variant="fab"
                            color="secondary"
                            onClick={this.props.handleIncrement}
                    >
                        <AddIcon/><span className={"cdp_icon_round_label"}>1</span>
                    </Button>
                </Grid>
                <Grid item>
                    <Button className={"cdp_button_round"}
                            variant="fab"
                            color="secondary"
                            onClick={this.props.handlePlusFive}
                    >
                        <AddIcon/><span className={"cdp_icon_round_label"}>5</span>
                    </Button>
                </Grid>
            </Grid>
        );
    };
}

PlusMinusButtons.propTypes = {
    handleDecrement: PropTypes.func.isRequired,
    handleIncrement: PropTypes.func.isRequired,
    handlePlusFive: PropTypes.func.isRequired,
};

export default PlusMinusButtons;