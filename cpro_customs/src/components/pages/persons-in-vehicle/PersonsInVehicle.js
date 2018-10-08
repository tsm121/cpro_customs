import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from '@material-ui/core/Paper';

import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import '../../../assets/css/core.css' // TODO: make this path absolute


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class PersonsInVehicle extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container
                      spacing={0}
					  justify="center"
					  alignItems="center"
					  direction="column"
				>
                    <Grid item xl={12}>
                        <h1 className={"primary"}>For how many persons do you want to declare goods?</h1>
                    </Grid>

                    <Grid container
                          xl={12}
                          spacing={0}
                          justify="center"
                          alignItems="center"
                          direction="row"
                    >
                        <Grid item xs={4}>
                            <Paper className={classes.control}>
                                <Grid container >
                                    <Grid item xs={1}>
                                        <img src={require(`./person_icon.svg`)} alt="icon" />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <img src={require(`./person_icon.svg`)} alt="icon" />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <img src={require(`./person_icon.svg`)} alt="icon" />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <img src={require(`./person_icon.svg`)} alt="icon" />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <img src={require(`./person_icon.svg`)} alt="icon" />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <img src={require(`./person_icon.svg`)} alt="icon" />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <img src={require(`./person_icon.svg`)} alt="icon" />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(PersonsInVehicle);