import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {withStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";

const styles1 = theme => ({
    snackbar: {
        backgroundColor: "white",
    },
});

function MySnackbarContent(props) {
    const {classes, className, message, onExited, ...other} = props;

    return (
        <SnackbarContent
            className={classNames(classes["snackbar"], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={"cdp_dark_grey"}>
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="default"
                    onClick={onExited}
                >
                    <CloseIcon/>
                </IconButton>,
            ]}
            {...other}
        />
    );
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class SnackBarNotification extends Component {

    render = () => {
        return (
            <div>
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
                >
                    <MySnackbarContentWrapper
                        onClose={this.props.onClose}
                        onExited={this.props.onExited}
                        message={this.props.message}
                    />
                </Snackbar>
            </div>
        );
    };
}

SnackBarNotification.propTypes = {
    open: PropTypes.bool,
    message: PropTypes.string,
};

export default SnackBarNotification;