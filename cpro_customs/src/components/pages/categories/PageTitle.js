import React, {Component} from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid/Grid";


const styles = ({
    container: {
        paddingBottom: '30px',
    },
});

class PageTitle extends Component {
    render = () => {
        const {title} = this.props;
        return (
            <Grid container
                  justify={"center"}
                  alignItems={"center"}
                  style={styles.container}
            >
                <Grid item>
                    <h1 className={"cdp cdp_primary"}>
                        {title}
                    </h1>
                </Grid>
            </Grid>
        )
    }
}

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PageTitle;