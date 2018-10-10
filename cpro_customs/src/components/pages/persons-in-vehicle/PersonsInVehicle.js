import React, {Component} from 'react'
import update from "immutability-helper";

import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from '@material-ui/core/Paper';

import '../../../assets/css/core.css' // TODO: make this path absolute
import './PersonsInVehicle.css'
import NavigationArrow from '../../NavigationArrow'


const styles = theme => ({
});

class PersonsInVehicle extends Component {
    constructor(props) {
        super(props);
        // init state
        this.state = {
            showYellowIcon: [true, false, false, false, false, false, false],
            iconClicked: [false, false, false, false, false, false, false],
            amountPersonsShown: 5,
            plusClickCounter: 0,
        };
    }

    render() {
        const {classes} = this.props;
        const {showYellowIcon, amountPersonsShown, plusClickCounter} = this.state;
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
                          className="personContainer"
                    >
                        <Grid item xs={11} sm={8} md={7} xl={6}>
                            <Paper className="personPaper">
                                <Grid container justify="center" spacing={0}>
                                    { /* person icons */
                                        (Array.apply(null, {length: amountPersonsShown}).map(Number.call, Number))
                                            .map(value => (
                                                <Grid item key={value}
                                                      onMouseEnter={() => this.personOnMouseOver(value)}
                                                      onMouseLeave={() => this.personOnMouseOut(value)}
                                                      onClick={() => this.personOnClick(value)}
                                                >
                                                    <img className="icon_sm" src={showYellowIcon[value] ?
                                                        require(`assets/img/icons/128x128/person_yellow.png`) :
                                                        require(`assets/img/icons/128x128/person_black.png`)}
                                                         alt="icon"
                                                    />
                                                </Grid>
                                            ))
                                    }
                                    { /* plus button */
                                        amountPersonsShown < 12
                                            ?   <Grid item
                                                      onClick={() => this.plusOnClick()}
                                                      onMouseOver={() => this.plusOnMouseOver()}
                                                      onMouseOut={() => this.plusOnMouseOut()}
                                                >
                                                    <img className="icon_sm"
                                                         src={require(`assets/img/icons/128x128/plus_black.png`)}
                                                         alt="icon"
                                                    />
                                                </Grid>
                                            : null
                                    }
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <NavigationArrow direction={"right"} page={"categories"}/>
                </Grid>
            </div>
        );
    }

    plusOnClick() {
        this.setState({
            showYellowIcon: update(this.state.showYellowIcon, {$push: [false]}),
            iconClicked: update(this.state.iconClicked, {$push: [false]}),
            amountPersonsShown: this.state.amountPersonsShown + 1,
            plusClickCounter: this.state.plusClickCounter + 1,
        });
    }

    plusOnMouseOver() {
        document.body.style.cursor = "pointer";
    }

    plusOnMouseOut() {
        document.body.style.cursor = "default";
    }

    /**
     * Event handler for mouse over
     * Updates the state -> yellow icons are shown
     * @param id - the id of the icon
     */
    personOnMouseOver(id) {
        const {showYellowIcon, iconClicked, amountPersonsShown} = this.state;
        if (iconClicked[id]) {
            return;
        }
        document.body.style.cursor = "pointer";
        console.log("in: " + id);
        let showYellowIcon_2 = showYellowIcon;
        for (let i=0; i <= id; i++) showYellowIcon_2[i] = true;
        for (let i = id + 1; i < amountPersonsShown; i++) showYellowIcon_2[i] = false;
        this.setState({
            showYellowIcon: update(showYellowIcon_2, {$set: showYellowIcon_2})
        });
    }

    /**
     * Event handler for mouse out
     * Updates the state -> black icons are shown
     * @param id - the id of the icon
     */
    personOnMouseOut(id) {
        const {showYellowIcon, iconClicked, amountPersonsShown} = this.state;

        if (iconClicked[id]) {
            this.setState({
              iconClicked: update(iconClicked, {[id]: {$set: false}})
            });
            return;
        }
        if (id === 0) return;
        document.body.style.cursor = "default";
        console.log("out: " + id);
        let showYellowIcons_2 = showYellowIcon;
        for (let i=1; i < amountPersonsShown; i++) showYellowIcons_2[i] = false;
        this.setState({
              showYellowIcon: update(showYellowIcon, {$set: showYellowIcons_2})
        });
    }

    /**
     * Event handler for on click
     * Updates the state -> marks current icon as clicked
     * @param id - the id of the icon
     */
    personOnClick(id) {
        const {iconClicked} = this.state;
        this.setState({
            iconClicked: update(iconClicked, {[id]: {$set: true}})
        });
    }
}

export default withStyles(styles)(PersonsInVehicle);