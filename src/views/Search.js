import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import searchService from '../services/searchService';
import DatePicker from 'react-date-picker';

class Search extends Component {
  state = {
    date: new Date(),
    // currentDate: new Date().getDate(),
    startingHour: 12,
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
    console.log('dateeeee', date);
  };

  onHourChange = startingHour => {
    console.log('houuuur', startingHour.target.value);
    this.setState({ startingHour });
  };

  // handleChange = event => this.setState({ startingHour: event.target.value });

  handleFormSubmit = e => {
    e.preventDefault();
    const { clubs } = this.state;
  };

  render() {
    const { clubs, isLoading } = this.state;
    return (
      <div>
        <h1>Search here your next game:</h1>
        Select date:
        <br />
        <DatePicker onChange={this.onDateChange} value={this.state.date} />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Select starting hour:
            <br />
            <select onChange={this.onHourChange}>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option defaultValue value="12">
                12:00
              </option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
            </select>
            <input type="submit" value="Submit" />
          </label>
        </form>
        <header className="header-clubs">
          <h3>Clubs still with available courts</h3>
        </header>
        {!isLoading &&
          clubs.map(club => {
            return (
              <div key={club._id}>
                <p>{club.name}</p>
                {/* <ul>
                  {club.openingHours.map(hour => {
                    return <li>{hour}</li>;
                  })}
                </ul>{' '} */}
              </div>
            );
          })}
        {isLoading && <div>loading...</div>}
      </div>
    );
  }
}

export default withAuth(Search);
