import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

import Homepage from './views/Homepage';
import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import Clubs from './views/Clubs';
import Search from './views/Search';
import ClubsDetail from './views/ClubsDetail';
import Bookings from './views/Bookings';
import Profile from './views/Profile';

import AuthProvider, { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navigation/Navbar';

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    // const { handleLogout } = this.props;
    return (
      <>
        {/* <button onClick={handleLogout}>logout</button> */}
        <Router>
          <div className="container">
            <AuthProvider>
              <div className="data-container">
                <Switch>
                  <AnonRoute exact path="/" component={Homepage} />
                  <AnonRoute exact path="/login" component={Login} />
                  <AnonRoute exact path="/signup" component={Signup} />
                  <PrivateRoute exact path="/private" component={PrivateView} />
                  <AnonRoute exact path="/search" component={Search} />
                  <AnonRoute exact path="/clubs" component={Clubs} />
                  <AnonRoute exact path="/clubs/:id" component={ClubsDetail} />
                  <AnonRoute exact path="/bookings" component={Bookings} />
                  <AnonRoute exact path="/profile" component={Profile} />
                </Switch>
              </div>
              <AnonRoute component={Navbar} />
            </AuthProvider>
          </div>
        </Router>
      </>
    );
  }
}

export default withAuth(App);
