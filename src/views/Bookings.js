import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import bookingsService from '../services/bookingsService';
import Loading from '../components/Loading/Loading';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

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

    return (
      <>
        <div id="page-name">
          <span>Bookings</span>
        </div>
        {bookings.length > 0 ? (
          <>
            {bookings.map(booking => {
              return (
                <div id="booking-card" key={booking._id}>
                  <div id="moment-booking">
                    <Moment format=" dddd DD/MM"></Moment>
                  </div>
                  <div id="booking-card-details">
                    <p>
                      Time: {booking.startingHour}h - {booking.startingHour + 1}h
                    </p>
                    <p>Price: {booking.club.price}€</p>
                    <p>Court: {booking.court.courtName}</p>
                  </div>
                  <Link id="home-book-btn-div" to="#">
                    {/* <Link id="home-book-btn-div" to={`/bookings/${booking._id}`}> */}
                    <div id="home-book-btn">Cancel booking</div>
                  </Link>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <h1>You have not booked a match yet... </h1>
            <Loading />

            <Link id="logout-btn-div" to="/search">
              {/* <Link id="home-book-btn-div" to={`/clubs/${club._id}`}> */}
              <div id="logout-btn">Book now</div>
            </Link>
          </>
        )}
      </>
    );
  }
}

export default withAuth(Bookings);
