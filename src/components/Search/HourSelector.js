import React, { Component } from 'react';
import { withBooking } from '../../Context/BookingContext';
import { withAuth } from '../../Context/AuthContext';

class HourSelector extends Component {
  onHourChange = e => {
    e.preventDefault();
    this.props.handleHourChange(e.target.value);
  };

  // handleOnHourSubmit = e => {
  //   e.preventDefault();
  //   const { searchStartingHour } = this.state;
  //   this.setState({ searchStartingHour: searchStartingHour.target.value });
  //   this.props.handleHourChange({
  //     searchStartingHour,
  //   });
  // };

  render() {
    return (
      <select id="selector" onChange={this.onHourChange}>
        {/* // <select id="selector" onChange={this.handleOnHourSubmit}> */}
        <option defaultValue value="9">
          9:00
        </option>
        <option value="10">10:00</option>
        <option value="11">11:00</option>
        <option value="12">12:00</option>
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
    );
  }
}

export default withAuth(withBooking(HourSelector));
