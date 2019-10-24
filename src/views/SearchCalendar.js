import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

class SearchCalendar extends Component {
  state = {
    Bookings: [],
  };

  componentDidMount() {}

  render() {
    const { Bookings } = this.state;

    return (
      <>
        <header className="header-bookings">
          <h1>Search Calendar</h1>
        </header>
        <section className="card-container">
          <div className="header">
            <p className="title">Select map here:</p>
          </div>
        </section>
      </>
    );
  }
}

export default withAuth(SearchCalendar);
