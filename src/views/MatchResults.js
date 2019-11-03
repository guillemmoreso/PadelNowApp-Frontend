import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import userService from '../services/userService';
import Moment from 'react-moment';
import Loading from '../components/Loading/Loading';

class MatchResults extends Component {
  state = {
    userBookings: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const userBookings = await userService.getAllUserBookings();
      this.setState({
        userBookings,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { userBookings, isLoading } = this.state;

    return (
      <>
        {userBookings.length > 0 ? (
          <>
            {userBookings.map(booking => {
              return (
                <div id="booking-card" key={booking._id}>
                  <div id="moment-booking">
                    <Moment format="dddd DD/MM">{booking.day}</Moment>
                  </div>
                  <div id="booking-card-details">
                    <p>
                      Time: {booking.startingHour}h - {booking.startingHour + 1}h
                    </p>
                    <p>Price: {booking.club.price}€</p>
                    <p>Court: {booking.court.courtName}</p>
                    {!booking.gameResult &&
                      userBookings.map(booking => {
                        return (
                          <>
                            <h3>{booking.startingHour}</h3>
                            <h3>{booking.club.city}</h3>
                          </>
                        );
                      })}
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

export default withAuth(MatchResults);
