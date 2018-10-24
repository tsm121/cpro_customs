import React, {Component} from "react";
import PropTypes from "prop-types";

import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Zoom from "@material-ui/core/Zoom/Zoom";
import {Icon} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    tooltip: {
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //borderRadius: 3,
        //border: 0,
        //color: 'white',
        //height: 48,
        padding: '15px',
        //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        fontSize: '1em',
        background: '#333333',
    },
};


class HelpTip extends Component {
    state = {
        open: false,
    };

    render = () => {
        const {text, placement, classes} = this.props;
        return (
            <ClickAwayListener onClickAway={this.handleTooltipClose}>
                <div>
                    <Tooltip
                        onClose={this.handleTooltipClose}
                        open={this.state.open}
                        title={text}
                        placement={placement}
                        TransitionComponent={Zoom}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        classes={{tooltip: classes.tooltip}}
                    >
                        <Icon
                            style={{color: '#404040'}}
                            onClick={this.handleTooltipOpen}
                            onMouseOver={this.handleTooltipOpen}
                            onMouseOut={this.handleTooltipClose}
                        >
                            help
                        </Icon>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        )
    };

    handleTooltipOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleTooltipClose = () => {
        this.setState({
            open: false,
        });
    };
}

HelpTip.propTypes = {
    text: PropTypes.string.isRequired,
    placement: PropTypes.string,
};

HelpTip.defaultProps = {
    placement: "bottom",
};


export default withStyles(styles)(HelpTip);

