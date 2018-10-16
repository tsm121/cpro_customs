import React, {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import "../../App.css"

const styles =({
	container: {
		paddingBottom: '5vw',
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

export default PageTitle;