import React, {Component} from "react";
import PropTypes from "prop-types";

import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Zoom from "@material-ui/core/Zoom/Zoom";
import {Icon} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    tooltip: {
        padding: '15px',
        fontSize: '1em',
        background: '#333333',
    },
    lightTooltip: {
        background: 'white',
        fontSize: '1em',
        color: "#37424a",
    }
};


class HelpTip extends Component {
    state = {
        open: false,
    };

    render = () => {
        const {text, placement, classes, light} = this.props;
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
                        classes={light ? {tooltip: classes.lightTooltip} : {tooltip: classes.tooltip}}
                    >
                        <Icon
                            style={light ? {color:"white", fontSize:"4.5vmin"} : {color: '#404040'}}
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

