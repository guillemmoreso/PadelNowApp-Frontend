import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { withAuth } from '../Context/AuthContext';
import { withBooking } from '../Context/BookingContext';
import clubsService from '../services/clubsService';
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
      const { searchStartingHour, date } = this.props;
      const courtIsFull = await clubsService.dataPickerClubDetail({ searchStartingHour, date, clubId });

      if (courtIsFull.length > 0) {
        this.setState({ reservation: false });
      } else if (courtIsFull === 'Date Error') {
        this.setState({ reservation: 'Date Error' });
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
        <div id="club-detail-heart">
          <ClubHeart club={_id} />
        </div>
        <div id="datePicker">
          <span id="select-date">Select date:</span>
          <DatePicker onChange={this.onDateChange} value={this.props.date} minDate={new Date()} />
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
        <div id="reservation-club">
          {reservation && reservation != null ? (
            <>
              <Link to={`/reservation/${_id}`} style={{ textDecoration: 'none' }}>
                <h2 id="submit-datapicker-club">Book court at: {this.props.searchStartingHour}:00 </h2>
              </Link>
            </>
          ) : (
            <>
              {reservation === null && <></>}
              {reservation === 'Date Error' && <p>I am not sure you can go to the past...</p>}
              {reservation === false && (
                <>
                  <div>
                    <img
                      id="sorry-img"
                      src="../../images/sorry.svg"
                      alt="location"
                      style={{ width: '15vw' }}
                    ></img>
                    <p>Court unavailable...</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    );
  }
}

export default withAuth(withBooking(ClubsDetail));
