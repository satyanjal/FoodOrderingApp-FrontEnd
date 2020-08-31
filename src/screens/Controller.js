import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './home/Home';
import Details from './details/Details';
import Checkout from './checkout/Checkout';
import Profile from './profile/Profile';
import  PrivateRoute  from '../common/PrivateRoute';

class Controller extends Component {

  constructor(props)
  {
    super(props);
    this.baseUrl = "http://localhost:8080/api/";
    this.state = {
      loggedIn: sessionStorage.getItem('access-token') == null ? false : true
    };
  }


  render(){
    return(
      <Router>
         <div className="main-container">
           <Switch>
              <Route exact path='/' render={(props) => <Home {...props} baseUrl = {this.baseUrl} /> }  />
              <Route exact path='/restaurant/:id' render={(props) => <Details {...props} baseUrl = {this.baseUrl} /> }  />
                
              {/* Added private router for checkout page - because only login user can go that page */}
              <PrivateRoute 
                  exact 
                  path='/checkout'
                  component={Checkout} 
                  baseUrl = {this.baseUrl}
                  />
              {/* Added private router for profile page - because only login user can go that page */}
              <PrivateRoute 
                  exact 
                  path='/profile'
                  component={Profile} 
                  baseUrl = {this.baseUrl}
                  /> 
            </Switch>
        </div>
      </Router>

    )
  }
}

export default Controller;
