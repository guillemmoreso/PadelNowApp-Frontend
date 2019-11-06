import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { withAuth } from '../Context/AuthContext';
import profileService from '../services/profileService';
import Loading from '../components/Loading/Loading';
import Backbar from '../components/Navigation/Backbar';

class MatchResults extends Component {
  state = {
    userBookings: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const userBookings = await profileService.getAllUserBookings();
      this.setState({
        userBookings,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { userBookings } = this.state;

    return (
      <>
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>Match Results</h1>
        </div>
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

                    {!booking.gameResult ? (
                      userBookings.map(booking => {
                        return (
                          <>
                            <h3>{booking.startingHour}</h3>
                            <h3>{booking.club.city}</h3>
                          </>
                        );
                      })
                    ) : (
                      <p>Hola</p>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <h1>You have not booked a match yet... </h1>
            <Loading />

            <Link id="logout-btn-div" to="/search">
              <div id="logout-btn">Book now</div>
            </Link>
          </>
        )}
      </>
    );
  }
}

export default withAuth(MatchResults);
