import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import searchService from '../services/searchService';
import DatePicker from 'react-date-picker';
import Loading from '../components/Loading/Loading';

class Search extends Component {
  state = {
    date: new Date(),
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
    this.setState({ startingHour: startingHour.target.value });
  };

  // handleChange = event => this.setState({ startingHour: event.target.value });

  handleFormSubmit = () => {
    // e.preventDefault();
    const { startingHour, date } = this.state;
    this.handleDatePicker({
      startingHour,
      date,
    });
  };

  handleDatePicker = user => {
    searchService
      .dataPicker(user)
      .then(() => {})
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const { clubs, isLoading } = this.state;
    return (
      <div>
        <div id="page-name">
          <span>Search</span>
        </div>
        Select date:
        <br />
        <div id="datePicker">
          <DatePicker onChange={this.onDateChange} value={this.state.date} />
        </div>
        <br />
        <form>
          {/* <form onSubmit={this.handleFormSubmit}> */}
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
            {/* <input type="submit" value="Submit" /> */}
          </label>
        </form>
        <input type="submit" value="Submit" onClick={this.handleFormSubmit} />
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
        {isLoading && <Loading />}
      </div>
    );
  }
}

export default withAuth(Search);
