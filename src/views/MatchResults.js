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
        <div id="viewport-with-navbar">
          <div id="page-name">
            <Backbar history={this.props.history} />
            <h1>Match Results</h1>
          </div>
          {userBookings.length > 0 ? (
            <>
              {userBookings.map(booking => {
                return (
                  <>
                    <Link to={`/profile/results/${booking._id}`} style={{ textDecoration: 'none' }}>
                      <div id="booking-card" key={booking._id}>
                        <div id="moment-booking">
                          <Moment format="DD dddd MMMM">{booking.day}</Moment>
                        </div>
                        <div id="booking-card-details">
                          <div id="booking-card-details">
                            <p>
                              {booking.startingHour}:00 - {booking.startingHour + 1}:00
                            </p>
                            <p>{booking.gameWon}</p>
                            <p className="with-bottom-border">{booking.court.courtName}</p>
                          </div>

                          {!booking.gameResult ? (
                            userBookings.map(booking => {
                              return <></>;
                            })
                          ) : (
                            <p>Poner</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </>
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
        </div>
      </>
    );
  }
}

export default withAuth(MatchResults);
