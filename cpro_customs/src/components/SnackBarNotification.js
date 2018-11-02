import React, {Component} from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

class SnackBarNotification extends Component {

    render = () => {
        return (
            <div>
                Open: {this.props.open ? "true" : "false"}
                Message: {this.props.message}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.props.open}
                    onClose={this.props.onClose}
                    onExited={this.props.onExited}
                    autoHideDuration={2000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.props.message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.props.onExited}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                />
            </div>
        );
    };
}

SnackBarNotification.propTypes = {};

SnackBarNotification.defaultProps = {};

export default SnackBarNotification;