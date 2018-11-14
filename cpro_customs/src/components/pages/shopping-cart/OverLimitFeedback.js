import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid/Grid";

class OverLimitFeedback extends Component {
    render() {

        const {overLimit, aboveLimitList} = this.props

        if (overLimit) {

            return (
                <div>
                    <Grid container
                          justify={"center"}
                          alignItems={"flex-start"}
                          alignContent={"center"}
                          direction={"column"}
                          className={"limit_container"}

                    >
                        <h4 className={"limit_title"}> You are above the legal import limit on the following item(s):</h4>
                        {aboveLimitList.map( value =>

                            <h4 className={"limit_item"}>
                                <h4 className={"limit_text"}>Item: </h4>
                                <h4 className={"limit_value"}> {value[0]},</h4>
                                <h4 className={"limit_text"}>over limit: </h4>
                                <h4 className={"limit_value"}> {value[1]}
                                {value[0].split(' ')[0] === "Alcohol" ? "L" : ''}
                                {value[0].split(' ')[0] === "Cigarettes" ? " pieces" : ''}</h4>

                            </h4>


                        )}
                    </Grid>
                </div>
            );
        } else {
            return (
                ''
            );
        }
    }
}

export default OverLimitFeedback;