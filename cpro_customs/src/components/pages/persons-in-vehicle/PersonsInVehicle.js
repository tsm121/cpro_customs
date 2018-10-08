import React, {Component} from 'react'
import update from "immutability-helper";

import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from '@material-ui/core/Paper';

import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import '../../../assets/css/core.css' // TODO: make this path absolute
import './PersonsInVehicle.css'



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
    static amount_persons_shown = 7;

    constructor(props) {
        super(props);
        //this.onMouseOver= this.onMouseOver.bind(this);
        let showIcons = [true, false, false, false, false, false, false];
        let iconClicked = [false, false, false, false, false, false, false];
        this.state = { showIcons: showIcons , iconClicked: iconClicked};
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
                        <h1 className={"primary"}>For how many persons do you want to declare goods?</h1>
                    </Grid>

                    <Grid container
                          spacing={0}
                          justify="center"
                          alignItems="center"
                          direction="row"
                    >
                        <Grid item xs={4}>
                            <Paper className={classes.control}>
                                <Grid container justify="flex-start" spacing={0}>
                                    {(Array.apply(null, {length: PersonsInVehicle.amount_persons_shown})
                                        .map(Number.call, Number))
                                        .map(value => (
                                            <Grid item key={value}
                                                  onMouseEnter={() => this.onMouseOver(value)}
                                                  onMouseLeave={() => this.onMouseOut(value)}
                                                  onClick={() => this.onClick(value)}
                                            >
                                                <img className="person_icon" src={this.state.showIcons[value] ?
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

    onMouseOver(id) {
        if (this.state.iconClicked[id]) {
            return;
        }
        document.body.style.cursor = "pointer";
        console.log("in: " + id);
        let showIcons = this.state.showIcons;
        for (let i=0; i <= id; i++) showIcons[i] = true;
        for (let i = id + 1; i < PersonsInVehicle.amount_persons_shown; i++) showIcons[i] = false;
        this.setState({
              showIcons: update(this.state.showIcons, {$set: showIcons})
        });
    }

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
        let showIcons = this.state.showIcons;
        for (let i=1; i < PersonsInVehicle.amount_persons_shown; i++) showIcons[i] = false;
        this.setState({
              showIcons: update(this.state.showIcons, {$set: showIcons})
        });
        /*this.setState({
              showIcons: update(this.state.showIcons, {[id]: {$set: false}})
        });*/
    }

    onClick(id) {
        this.setState({
            iconClicked: update(this.state.iconClicked, {[id]: {$set: true}})
        });
    }
}

export default withStyles(styles)(PersonsInVehicle);