import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';
import Backbar from '../components/Navigation/Backbar';
import ClubHeart from '../components/Club/ClubHeart';
import HourSelector from '../components/Search/HourSelector';

class ClubsDetail extends Component {
  state = {
    date: new Date(),
    club: {},
    isLoading: true,
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

  render() {
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
          <DatePicker onChange={this.onDateChange} value={this.state.date} />
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
      </section>
    );
  }
}

export default withAuth(ClubsDetail);
