import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Homepage from './views/Homepage';
import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import Clubs from './views/Clubs';
import Search from './views/Search';
import ClubsDetail from './views/ClubsDetail';
import BookingDetail from './views/BookingDetail';
import Bookings from './views/Bookings';
import Profile from './views/Profile';
import EditProfile from './views/Edit-Profile';
import FavoriteClubs from './views/FavoriteClubs';
import MatchResults from './views/MatchResults';

import ErrorPage from './views/ErrorPage';

import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navigation/Navbar';

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <>
        <Router>
          <div className="container">
            <div className="data-container">
              <Switch>
                <AnonRoute exact path="/" component={Homepage} />
                <AnonRoute exact path="/login" component={Login} />
                <AnonRoute exact path="/signup" component={Signup} />
                <PrivateRoute exact path="/private" component={PrivateView} />
                <PrivateRoute exact path="/search" component={Search} />
                <PrivateRoute exact path="/clubs" component={Clubs} />
                <PrivateRoute exact path="/clubs/:id" component={ClubsDetail} />
                <PrivateRoute exact path="/bookings/:id" component={BookingDetail} />
                <PrivateRoute exact path="/bookings" component={Bookings} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/profile/favorites" component={FavoriteClubs} />
                <PrivateRoute exact path="/profile/results" component={MatchResults} />
                <PrivateRoute exact path="/profile/edit-profile" component={EditProfile} />

                <Route component={ErrorPage} />
              </Switch>
            </div>
            <PrivateRoute component={Navbar} />
          </div>
        </Router>
      </>
    );
  }
}

export default withAuth(App);
