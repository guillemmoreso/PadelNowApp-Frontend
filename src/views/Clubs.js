import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

// import moment from 'moment';

class Clubs extends Component {
  state = {
    clubs: [],
  };

  componentDidMount() {}

  render() {
    const { clubs } = this.state;

    return (
      <>
        <header className="header-clubs">
          <h1>Clubs</h1>
        </header>
        <section className="card-container">
          <div className="header">
            <p className="title">Registered Clubs</p>
          </div>
        </section>
      </>
    );
  }
}

export default withAuth(Clubs);
