import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import withRouter from "react-router/es/withRouter";

import Home from './pages/home/Home'
import PersonsInVehicle from './pages/persons-in-vehicle/PersonsInVehicle'
import OnBoarding from "./pages/on-boarding/OnBoarding";
import Categories from "./pages/categories/overview/Categories";
import Animals from "./pages/categories/animals/Animals";
import Pet from "./pages/categories/animals/Pet";
import Horse from "./pages/categories/animals/Horse";
import Import from "./pages/categories/animals/Import";
import Bought from "./pages/categories/animals/Bought";
import Goods from "./pages/categories/goods/Goods";
import Tobacco from "./pages/categories/tobacco/Tobacco";
import Alcohol from "./pages/categories/alcohol/Alcohol";
import Beer from "./pages/categories/alcohol/Beer";
import AlcopopAndOthers from "./pages/categories/alcohol/AlcopopAndOthers";
import Wine from "./pages/categories/alcohol/Wine";
import FortifiedWine from "./pages/categories/alcohol/FortifiedWine";
import Spirits from "./pages/categories/alcohol/Spirits";
import Cigarettes from "./pages/categories/tobacco/Cigarettes";
import CigarsAndCigarillos from "./pages/categories/tobacco/CigarsAndCigarillos";
import SnuffAndChewingTobacco from "./pages/categories/tobacco/SnuffAndChewingTobacco";
import SmokingTobacco from "./pages/categories/tobacco/SmokingTobacco";
import CigarettePaperAndSheaths from "./pages/categories/tobacco/CigarettePaperAndSheaths";
import ShoppingCart from "./pages/shopping-cart/ShoppingCart";
import Checkout from "./pages/checkout/Checkout";
import Endpage from "./pages/endpage/Endpage";
import NotFound from "./pages/NotFound";


/**
 * Router handles routing through our pages / components
 * based on the given path
 * How routing works: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
 */
class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/persons-in-vehicle' component={PersonsInVehicle}/>
                <Route exact path='/on-boarding' component={OnBoarding}/>
                <Route exact path='/categories' component={Categories}/>
                <Route exact path='/checkout' component={Checkout}/>
                <Route exact path='/endpage' component={Endpage}/>
                <Route exact path='/categories/animals' component={Animals}/>
                <Route exact path='/categories/animals/pet' component={Pet}/>
                <Route exact path='/categories/animals/horse' component={Horse}/>
                <Route exact path='/categories/animals/import' component={Import}/>
                <Route exact path='/categories/animals/bought' component={Bought}/>
                <Route exact path='/categories/goods' component={Goods}/>
                <Route exact path='/declaration-list' component={ShoppingCart}/>
                <Route exact path='/categories/alcohol' component={Alcohol}/>
                <Route exact path='/categories/alcohol/beer' component={Beer}/>
                <Route exact path='/categories/alcohol/alcopop-and-others' component={AlcopopAndOthers}/>
                <Route exact path='/categories/alcohol/wine' component={Wine}/>
                <Route exact path='/categories/alcohol/fortified-wine' component={FortifiedWine}/>
                <Route exact path='/categories/alcohol/spirits' component={Spirits}/>
                <Route exact path='/categories/tobacco' component={Tobacco}/>
                <Route exact path='/categories/tobacco/cigarettes' component={Cigarettes}/>
                <Route exact path='/categories/tobacco/cigars-and-cigarillos' component={CigarsAndCigarillos}/>
                <Route exact path='/categories/tobacco/snuff-and-chewing-tobacco' component={SnuffAndChewingTobacco}/>
                <Route exact path='/categories/tobacco/smoking-tobacco' component={SmokingTobacco}/>
                <Route exact path='/categories/tobacco/cigarette-paper-and-sheaths'
                       component={CigarettePaperAndSheaths}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        );
    }

    /**
     * Handles scrolling to top when a new route gets called
     * @param nextProps - the props received by this component
     */
    componentWillReceiveProps(nextProps) {
        const {location, history: {action}} = nextProps;
        if (location !== this.props.location && action === 'PUSH') {
            // new navigation - scroll to top
            window.scrollTo(0, 0);
        }
        // eventually we might want to try setting up some scroll logic for 'POP'
        // events (back button) to reset the previous scroll position
    }
}

export default withRouter(Router);
