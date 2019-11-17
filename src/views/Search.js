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
      this.setState({ clubs: userSearchResult });
    } catch (error) {
      console.error('Error while searching for available courts');
    }
  };

  render() {
    const { clubs, isLoading } = this.state;
    const { searchStartingHour } = this.props;
    return (
      <div id="viewport-with-navbar">
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>Search</h1>
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

        {!isLoading &&
          clubs.map(club => {
            return (
              <div id="highlight-clubs-card-search" key={club._id}>
                <Link to={`/clubs/${club._id}`}>
                  <img
                    id="highlight-clubs-card-img-search"
                    style={{
                      backgroundImage: `linear-gradient(180deg,transparent,rgba(0,0,0,.5)),url(${club.clubImages[0]})`,
                      height: '30vh',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'none',
                    }}
                    alt="with-gradient"
                  ></img>
                </Link>
                <ClubHeart club={club._id} />
                <span id="highlight-clubs-card-content">
                  <h2>{club.name}</h2>
                  <h2>{club.price}€</h2>
                </span>
                <Link id="search-book-btn-div" to={`/reservation/${club._id}`}>
                  <div id="search-book-btn">Book Now </div>
                </Link>
              </div>
            );
          })}

        {!isLoading && clubs.length === 0 && (
          <>
            <div id="sorry-div">
              <img id="sorry-img" src="../../images/sorry.svg" alt="location"></img>
              <h2>
                Sorry... <br />
                No available clubs
                <br />
                Try another date!
              </h2>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(withBooking(Search));
