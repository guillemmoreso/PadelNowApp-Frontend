import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import { withAuth } from '../Context/AuthContext';
import bookingsService from '../services/bookingsService';
import Backbar from '../components/Navigation/Backbar';
import 'react-toastify/dist/ReactToastify.css';

class EditMatchResults extends Component {
  state = {
    bookingResult: {},
    isLoading: true,
    gameResult: 'TBC',
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
      const { gameResult } = this.state;
      const bookingResult = await bookingsService.gameResult({ gameResult, bookingId });
      this.setState({ bookingResult, gameResult });
      toast.info('Game Result Submited');
      this.props.history.push('/profile/results');
    } catch (error) {
      console.error('Error while inserting Game Result');
    }
  };

  handleGameResult = event => {
    if (event.target.value === 'Won') this.setState({ gameResult: 'Won' });
    else this.setState({ gameResult: 'Lost' });
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
                  <p>Current Status: {bookingResult.gameResult}</p>
                  <form onSubmit={this.handleFormSubmit}>
                    <select id="selector" onChange={this.handleGameResult}>
                      <option value="--" defaultValue>
                        --
                      </option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                    </select>
                    <input type="submit" />
                  </form>
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
