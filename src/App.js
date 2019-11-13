import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';

import Homepage from './views/Homepage';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import Clubs from './views/Clubs';
import ClubsDetail from './views/ClubsDetail';
import Search from './views/Search';
import Reservation from './views/Reservation';
import Bookings from './views/Bookings';
import BookingDetail from './views/BookingDetail';
import Profile from './views/Profile';
import ProfileDetail from './views/ProfileDetail';
import EditProfile from './views/Edit-Profile';
import FavoriteClubs from './views/FavoriteClubs';
import MatchResults from './views/MatchResults';
import Friends from './views/Friends';
import PadelClubsMap from './views/Map';
import ErrorPage from './views/auth/ErrorPage';

import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/Routes/PrivateRoute';
import AnonRoute from './components/Routes/AnonRoute';
import Navbar from './components/Navigation/Navbar';

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <>
        <ToastContainer autoClose={2000} />
        <Router>
          <div className="container">
            <div className="data-container">
              <Switch>
                <PrivateRoute exact path="/search" component={Search} />
                <PrivateRoute exact path="/reservation/:id" component={Reservation} />
                <PrivateRoute exact path="/clubs" component={Clubs} />
                <PrivateRoute exact path="/clubs/:id" component={ClubsDetail} />
                <PrivateRoute exact path="/bookings" component={Bookings} />
                <PrivateRoute exact path="/bookings/:id" component={BookingDetail} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/profile/user/:id" component={ProfileDetail} />
                <PrivateRoute exact path="/profile/favorites" component={FavoriteClubs} />
                <PrivateRoute exact path="/profile/results" component={MatchResults} />
                <PrivateRoute exact path="/profile/friends" component={Friends} />
                <PrivateRoute exact path="/profile/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/map" component={PadelClubsMap} />
                <AnonRoute exact path="/" component={Homepage} />
                <AnonRoute exact path="/login" component={Login} />
                <AnonRoute exact path="/signup" component={Signup} />

                <Route component={ErrorPage} path="*" />
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
