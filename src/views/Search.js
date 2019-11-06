import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { withAuth } from '../Context/AuthContext';
import { withBooking } from '../Context/BookingContext';
import searchService from '../services/searchService';
import Backbar from '../components/Navigation/Backbar';
import HourSelector from '../components/Search/HourSelector';

class Search extends Component {
  state = {
    date: new Date(),
    searchStartingHour: this.props.searchStartingHour,
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
    this.setState({ date });
  };

  handleFormSubmit = async () => {
    try {
      const { searchStartingHour, date } = this.state;
      const userSearchResult = await searchService.dataPicker({ searchStartingHour, date });
      this.setState({ clubs: userSearchResult });
    } catch (error) {
      console.error('Error while searching for available courts');
    }
  };

  render() {
    const { clubs, isLoading } = this.state;
    return (
      <div>
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>Profile</h1>
        </div>
        <br />
        <div id="datePicker">
          <span id="select-date">Select date:</span>
          <DatePicker onChange={this.onDateChange} value={this.state.date} />
        </div>
        <br />
        <div id="display-block">
          <div id="hour-select-div">
            <br />
            <HourSelector />
          </div>
          <div id="submit-datapicker">
            <input type="submit" value="Submit" onClick={this.handleFormSubmit} id="submit-datapicker" />
          </div>
        </div>
        <header className="header-clubs">
          <h3>Clubs still with available courts</h3>
        </header>
        {!isLoading &&
          clubs.map(club => {
            return (
              <div key={club._id}>
                <p>{club.name}</p>
                <Link id="home-book-btn-div" to={`/clubs/${club._id}`}>
                  <div id="home-book-btn">Club details</div>
                </Link>
                <Link id="home-book-btn-div" to={`/reservation/${club._id}`}>
                  <div id="home-book-btn">Book now</div>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default withAuth(withBooking(Search));
