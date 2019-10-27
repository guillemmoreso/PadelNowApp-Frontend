import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

class Bookings extends Component {
  state = {
    Bookings: [],
  };

  componentDidMount() {}

  render() {
    // const { Bookings } = this.state;

    return (
      <>
        <header className="header-bookings">
          <h1>Bookings</h1>
        </header>
        <section className="card-container">
          <div className="header">
            <p className="title">Bookings</p>
          </div>
        </section>
      </>
    );
  }
}

export default withAuth(Bookings);
