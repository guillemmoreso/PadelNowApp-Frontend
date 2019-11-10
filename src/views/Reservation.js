import React, { Component } from 'react';
import Moment from 'react-moment';
import { withAuth } from '../Context/AuthContext';
import { withBooking } from '../Context/BookingContext';
import clubsService from '../services/clubsService';
import bookingsService from '../services/bookingsService';
import Backbar from '../components/Navigation/Backbar';

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
      //   console.log(userBooking);
      //   this.setState({ clubs: userSearchResult });
    } catch (error) {
      console.error('Error while searching for available courts');
    }
  };

  render() {
    const { date, searchStartingHour } = this.state;
    const { name, location, price, clubImages, _id, courts } = this.state.club;
    return (
      <>
        <h1 id="club-detail-header">{name}</h1>
        {/* <h1 id="club-detail-header">{courts}</h1> */}
        <Moment format="DD dddd MMMM">{date}</Moment>
        <h2>{searchStartingHour}</h2>
        <p>{location}</p>
        <p>{price}€</p>
        <div id="submit-datapicker">
          <input type="submit" value="Submit" onClick={this.handleFormSubmit} id="submit-datapicker" />
        </div>
      </>
    );
  }
}

export default withAuth(withBooking(Reservation));
