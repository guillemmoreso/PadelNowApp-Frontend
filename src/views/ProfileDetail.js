import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { withAuth } from '../Context/AuthContext';
import { withBooking } from '../Context/BookingContext';
import clubsService from '../services/clubsService';
import searchService from '../services/searchService';
import Backbar from '../components/Navigation/Backbar';
import ClubHeart from '../components/Club/ClubHeart';
import HourSelector from '../components/Search/HourSelector';

class ClubsDetail extends Component {
  state = {
    club: {},
    isLoading: true,
    reservation: null,
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

  saveClub = id => {
    clubsService.saveClubToFavorites(id).then(response => {
      this.setState({
        userClubs: response.updatedUser.clubs,
      });
    });
  };

  onDateChange = date => {
    this.props.handleDateChange(date);
  };

  handleFormSubmit = async () => {
    try {
      const clubId = this.props.match.params.id;
      // console.log('clubID', clubId);
      const { searchStartingHour, date } = this.props;
      const courtIsFull = await clubsService.dataPickerClubDetail({ searchStartingHour, date, clubId });
      if (courtIsFull.length > 0) {
        this.setState({ reservation: false });
      } else {
        this.setState({ reservation: true });
      }
    } catch (error) {
      console.error('Error while searching for available courts');
    }
  };

  render() {
    const { reservation } = this.state;
    const { name, location, clubImages, _id } = this.state.club;
    return (
      <section className="club-detail-container">
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>{name}</h1>
        </div>
        <div id="club-header-image">
          <img src={clubImages} alt="club-avatar"></img>
        </div>
        <h1 id="club-detail-header">{name}</h1>
        <div id="club-detail-location">
          <p>{location}</p>
          <img src="/../../images/map.svg" alt="map-icon"></img>
        </div>
        {/* <p>Court Price: {price}€</p> */}
        <div id="club-detail-heart">
          <ClubHeart club={_id} />
        </div>
        <div id="datePicker">
          <span id="select-date">Select date:</span>
          <DatePicker onChange={this.onDateChange} value={this.props.date} />
        </div>
        <br />
        <div id="display-block">
          <div id="hour-select-div">
            <HourSelector />
          </div>
          <div id="submit-datapicker">
            <input type="submit" value="Submit" onClick={this.handleFormSubmit} id="submit-datapicker" />
          </div>
        </div>
        <br></br>
        <div id="reservation">
          {reservation ? (
            <>
              {/* Pensar como esconder el mensaje si el usuario hace mas de un submit */}
              <Link to={`/reservation/${_id}`}>
                <div>Book now</div>
              </Link>
            </>
          ) : (
            <>
              {reservation === null && <></>}
              {reservation === false && (
                <p>
                  All the courts at {this.props.searchStartingHour} are booked... You can find all available courts at
                  {this.props.searchStartingHour}
                  here:
                  <Link to="/search">See other Clubs</Link>
                </p>
              )}
            </>
          )}
        </div>
      </section>
    );
  }
}

export default withAuth(withBooking(ClubsDetail));
