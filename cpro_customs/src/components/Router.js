import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './pages/home/Home'
import PersonsInVehicle from './pages/persons-in-vehicle/PersonsInVehicle'
import Categories from './pages/categories/Categories'

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
              <Route exact path='/categories' component={Categories}/>
            </Switch>
		);
	}
}

export default Router;
