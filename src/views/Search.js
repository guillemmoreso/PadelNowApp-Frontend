import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { withAuth } from '../Context/AuthContext';
import { withBooking } from '../Context/BookingContext';
import searchService from '../services/searchService';
import Backbar from '../components/Navigation/Backbar';
import ClubHeart from '../components/Club/ClubHeart';
import HourSelector from '../components/Search/HourSelector';

class Search extends Component {
  state = {
    clubs: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const clubs = await searchService.getClubsByHour();
      this.setState({
        clubs,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  onDateChange = date => {
    this.props.handleDateChange(date);
  };

  handleFormSubmit = async () => {
    try {
      const { searchStartingHour, date } = this.props;
      const userSearchResult = await searchService.dataPicker({ searchStartingHour, date });
      console.log(userSearchResult);
      this.setState({ clubs: userSearchResult });
    } catch (error) {
      console.error('Error while searching for available courts');
    }
  };

  render() {
    const { clubs, isLoading, searchStartingHour } = this.state;
    console.log('props', this.props);
    return (
      <div id="viewport-with-navbar">
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>Search</h1>
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

        {!isLoading &&
          clubs.map(club => {
            return (
              <div id="highlight-clubs-card-search" key={club._id}>
                <Link to={`/clubs/${club._id}`}>
                  <img id="highlight-clubs-card-img-search" src={club.clubImages[0]} alt="club-avatar"></img>
                </Link>
                <ClubHeart club={club._id} />
                <div id="highlight-clubs-card-content">
                  <h1 id="club-name-card">{club.name}</h1>
                  <Link id="home-book-btn-div" to={`/clubs/${club._id}`}>
                    <div id="home-book-btn">
                      Book at {searchStartingHour}:00 for only {club.price}€{' '}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default withAuth(withBooking(Search));
