import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { withAuth } from '../Context/AuthContext';
import bookingsService from '../services/bookingsService';
import Loading from '../components/Loading/Loading';
import Backbar from '../components/Navigation/Backbar';

class Bookings extends Component {
  state = {
    bookings: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const bookings = await bookingsService.getAllUserBookings();
      this.setState({
        bookings,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { bookings, isLoading } = this.state;
    const { pathname } = this.props.location;
    console.log(pathname);

    return (
      <>
        <div id="viewport-with-navbar">
          <div id="page-name">
            <Backbar history={this.props.history} />
            <h1>Upcoming Bookings</h1>
          </div>

          {!isLoading && bookings.length > 0 ? (
            <>
              {bookings.map(booking => {
                return (
                  <div id="booking-card" key={booking._id}>
                    <div id="moment-booking">
                      <Moment format="DD dddd MMMM">{booking.day}</Moment>
                    </div>
                    <div id="booking-card-details">
                      <p>
                        {booking.startingHour}:00 - {booking.startingHour + 1}:00
                      </p>
                      <p className="with-bottom-border">{booking.court.courtName}</p>
                    </div>
                    <Link id="home-book-btn-div" to={`/bookings/${booking._id}`}>
                      <div id="home-book-btn">More details </div>
                    </Link>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div id="missing-favorite-div">
                <img id="sorry-img" src="../../images/nerd.svg" alt="location"></img>
                <h2>
                  Still No Bookings... <br />
                  What's your Excuse?
                </h2>
                <Link id="home-book-btn-div" to={'/search'}>
                  <div id="home-book-btn">Let's Padel!</div>
                </Link>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default withAuth(Bookings);
