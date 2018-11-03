/**
 * Handles show notification
 * @param message - the notification message being displayed
 * @return {Function}
 */
export const showNotification = function showNotification(message) {
    // only show notification if the queue is not too full
    if (this.notificationQueue.length <= 1) {
        this.notificationQueue.push(message);
    }
    if (this.state.openNotification) {
        // immediately begin dismissing current message
        // to start showing new one
        this.setState({openNotification: false});
    } else {
        processQueue.bind(this).apply();
    }
};

/**
 * Handles close notification
 * @param event
 * @param reason
 */
export const closeNotification = function closeNotification(event, reason) {
    if (reason === 'clickaway') {
        return;
    }
    this.setState({openNotification: false});
};

/**
 * Handles exit snackbar notification
 */
export const exitNotification = function exitNotification() {
    processQueue.bind(this).apply();
};


/**
 * Shows next notification if there is one, else hides snackbar
 */
export const processQueue = function processQueue() {
    if (this.notificationQueue.length > 0) {
        this.setState({
            notificationMessage: this.notificationQueue.shift(),
            openNotification: true,
        });
    } else {
        this.setState({openNotification: false});
    }
};