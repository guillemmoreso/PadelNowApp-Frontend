import React, { Component } from 'react';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { withAuth } from '../Context/AuthContext';
import { withBooking } from '../Context/BookingContext';
import clubsService from '../services/clubsService';
import bookingsService from '../services/bookingsService';
import Backbar from '../components/Navigation/Backbar';
import 'react-toastify/dist/ReactToastify.css';

class Reservation extends Component {
  state = {
    club: {},
    isLoading: true,
    searchStartingHour: this.props.searchStartingHour,
    date: this.props.date,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    try {
      const club = await clubsService.getClubById(id);
      this.setState({
        club,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
      });
    }
  }

  handleFormSubmit = async () => {
    try {
      const { searchStartingHour, date } = this.props;
      const clubId = this.props.match.params.id;
      const userId = this.props.user._id;
      const courtId = this.state.club.courts;
      const userBooking = await bookingsService.newBooking({ searchStartingHour, date, clubId, userId, courtId });
      toast.success('Booking Accepted');
      this.props.history.push('/bookings');
    } catch (error) {
      console.error('Error while searching for available courts');
    }
  };

  render() {
    const { date, searchStartingHour } = this.state;
    const numberSearchStartingHour = parseInt(searchStartingHour, 10);
    const { name, location, price, clubImages, _id, courts } = this.state.club;
    return (
      <>
        <div id="viewport-with-navbar">
          <div id="page-name">
            <Backbar history={this.props.history} />
            <h1>
              {name} <Moment format="DD/MM/YY">{date}</Moment>
            </h1>
          </div>

          <div id="reservation-card">
            <h1 id="club-detail-header">{name}</h1>

            <div id="moment-booking">
              <img id="padel-icon" src="../../images/padel.svg" alt="padel-icon"></img>
              <Moment format="dddd DD MMMM">{date}</Moment>
            </div>
            <div id="booking-card-details">
              <p id="reservation-location">{location}</p>
              <div id="reservation-hours">
                <p>
                  <span>Start</span>
                  <br />
                  {searchStartingHour}:00
                </p>
                <p>
                  <span>End</span>
                  <br />
                  {numberSearchStartingHour + 1}:00
                </p>
                <p>
                  <span>Duration</span>
                  <br />
                  60min
                </p>
              </div>
            </div>
            <div id="profile-btn-div">
              <div id="profile-btn">
                <p>Court Price</p>
              </div>
              <div>
                <h2>{price}€</h2>{' '}
              </div>
            </div>
            <div id="profile-btn-div">
              <div id="profile-btn">
                <p>Payment Method</p>
              </div>
              <div>
                <span>Cash</span>
              </div>
            </div>
            <div id="profile-btn-div">
              <div id="profile-btn">
                <p>Cancellation Policy</p>
              </div>
              <div>
                <span>24h</span>
              </div>
            </div>
            <div id="submit-reservation">
              <input type="submit" value="Confirm Booking" onClick={this.handleFormSubmit} id="submit-datapicker" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(withBooking(Reservation));
