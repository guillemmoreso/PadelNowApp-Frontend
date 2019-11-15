import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { withAuth } from '../Context/AuthContext';
import bookingsService from '../services/bookingsService';
import Loading from '../components/Loading/Loading';
import Backbar from '../components/Navigation/Backbar';
import BookingDescription from '../components/Booking/BookingDescription';

class EditMatchResults extends Component {
  state = {
    bookingResult: {},
    isLoading: true,
    gameWon: false,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    try {
      const bookingResult = await bookingsService.getBookingById(id);
      this.setState({
        bookingResult,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const bookingId = this.props.match.params.id;
      const { gameWon } = this.state;
      const bookingResult = await bookingsService.gameResult({ gameWon, bookingId });
      console.log('bookingId', bookingResult);

      this.setState({ bookingResult, gameWon });
    } catch (error) {
      console.error('Error while inserting Game Result');
    }
  };

  handleGameResult = event => {
    if (event.target.value === 'Won') this.setState({ gameWon: true });
    else this.setState({ gameWon: false });
    console.log('State:GameWon', this.state.gameWon);
  };

  render() {
    const { bookingResult, isLoading } = this.state;

    return (
      <>
        {!isLoading && (
          <section className="club-detail-container">
            <div id="page-name">
              <Backbar history={this.props.history} />
              <h1>Booking Details</h1>
            </div>

            <div id="booking-card" key={bookingResult._id}>
              <div id="moment-booking">
                <Moment format="DD dddd MMMM">{bookingResult.day}</Moment>
              </div>
              <div id="booking-card-details">
                <div id="booking-card-details">
                  <p>
                    {bookingResult.startingHour}:00 - {bookingResult.startingHour + 1}:00
                  </p>
                  <form onSubmit={this.handleFormSubmit}>
                    <select id="selector" onChange={this.handleGameResult}>
                      <option value="--" defaultValue>
                        --
                      </option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                    </select>
                    <input type="submit" />
                    {/* PONER NOTIFICACION */}
                  </form>
                  {/* <p className="with-bottom-border">{bookingResult.court.courtName}</p> */}
                  <p>{this.state.gameWon && 'jjjjj'}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
}

export default withAuth(EditMatchResults);
