import React, {Component} from 'react'
import update from "immutability-helper";

import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from '@material-ui/core/Paper';

import '../../../assets/css/core.css' // TODO: make this path absolute
import './PersonsInVehicle.css'


const styles = theme => ({
  personPaper: {
    padding: theme.spacing.unit * 2,
  },
});

class PersonsInVehicle extends Component {
    static amount_persons_shown = 7;

    constructor(props) {
        super(props);
        // init state
        let showYellowIcon = [true, false, false, false, false, false, false];
        let iconClicked = [false, false, false, false, false, false, false];
        this.state = { showYellowIcon: showYellowIcon , iconClicked: iconClicked};
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container
                      spacing={0}
                      justify="center"
                      alignItems="center"
                      direction="column"
                >
                    <Grid item xl={12}>
                        <h1 className={"cdp cdp_primary"}>For how many persons do you want to declare goods?</h1>
                    </Grid>

                    <Grid container
                          spacing={0}
                          justify="center"
                          alignItems="center"
                          direction="row"
                    >
                        <Grid item xs={4}>
                            <Paper className={classes.personPaper}>
                                <Grid container justify="flex-start" spacing={0}>
                                    {(Array.apply(null, {length: PersonsInVehicle.amount_persons_shown})
                                        .map(Number.call, Number))
                                        .map(value => (
                                            <Grid item key={value}
                                                  onMouseEnter={() => this.onMouseOver(value)}
                                                  onMouseLeave={() => this.onMouseOut(value)}
                                                  onClick={() => this.onClick(value)}
                                            >
                                                <img className="person_icon" src={this.state.showYellowIcon[value] ?
                                                    require(`./person_icon_yellow.png`) : require(`./person_icon_black.png`)}
                                                     alt="icon"
                                                />
                                            </Grid>
                                        ))}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }

    /**
     * Event handler for mouse over
     * Updates the state -> yellow icons are shown
     * @param id - the id of the icon
     */
    onMouseOver(id) {
        if (this.state.iconClicked[id]) {
            return;
        }
        document.body.style.cursor = "pointer";
        console.log("in: " + id);
        let showYellowIcon = this.state.showYellowIcon;
        for (let i=0; i <= id; i++) showYellowIcon[i] = true;
        for (let i = id + 1; i < PersonsInVehicle.amount_persons_shown; i++) showYellowIcon[i] = false;
        this.setState({
              showYellowIcon: update(this.state.showYellowIcon, {$set: showYellowIcon})
        });
    }

    /**
     * Event handler for mouse out
     * Updates the state -> black icons are shown
     * @param id - the id of the icon
     */
    onMouseOut(id) {
        if (this.state.iconClicked[id]) {
            this.setState({
              iconClicked: update(this.state.iconClicked, {[id]: {$set: false}})
            });
            return;
        }
        if (id === 0) return;
        document.body.style.cursor = "default";
        console.log("out: " + id);
        let showIcons = this.state.showYellowIcon;
        for (let i=1; i < PersonsInVehicle.amount_persons_shown; i++) showIcons[i] = false;
        this.setState({
              showYellowIcon: update(this.state.showYellowIcon, {$set: showIcons})
        });
    }

    /**
     * Event handler for on click
     * Updates the state -> marks current icon as clicked
     * @param id - the id of the icon
     */
    onClick(id) {
        this.setState({
            iconClicked: update(this.state.iconClicked, {[id]: {$set: true}})
        });
    }
}

export default withStyles(styles)(PersonsInVehicle);