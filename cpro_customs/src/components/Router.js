import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './pages/home/Home'
import PersonsInVehicle from './pages/persons-in-vehicle/PersonsInVehicle'
import OnBoarding from "./pages/on-boarding/OnBoarding";
import Categories from "./pages/categories/Categories";
import Overview from './pages/categories/Overview'
import Animals from "./pages/categories/animals/Animals";
import Pet from "./pages/categories/animals/Pet";
import Horse from "./pages/categories/animals/Horse";
import Import from "./pages/categories/animals/Import";
import Bought from "./pages/categories/animals/Bought";
import Goods from "./pages/categories/goods/Goods";
import Tobacco from "./pages/categories/tobacco/Tobacco";
import Alcohol from "./pages/categories/alcohol/Alcohol";


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
				<Route exact path='/categories' component={Categories} />
                <Route exact path='/categories' component={Overview}/>
                <Route exact path='/categories/animals' component={Animals}/>
                <Route exact path='/categories/animals/pet' component={Pet}/>
                <Route exact path='/categories/animals/horse' component={Horse}/>
                <Route exact path='/categories/animals/import' component={Import}/>
                <Route exact path='/categories/animals/bought' component={Bought}/>
                <Route exact path='/categories/goods' component={Goods}/>
                <Route exact path='/categories/tobacco' component={Tobacco}/>
                <Route exact path='/categories/alcohol' component={Alcohol}/>
            </Switch>
		);
	}
}

export default Router;
