import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchClubs extends Component {
  state = {
    value: '',
  };

  render() {
    const { clubs } = this.props;

    return (
      <div>
        <div id="highlight-clubs-card" key={clubs._id}>
          <img id="highlight-clubs-card-img" src={clubs.clubImages[0]} alt="club-avatar"></img>
          <div id="highlight-clubs-card-content">
            <h3>{clubs.name}</h3>
            <p id="home-club-text">{clubs.location}</p>
            <Link id="home-book-btn-div" to="/login">
              <div id="home-book-btn">Book now</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchClubs;
