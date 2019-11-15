import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import { withBooking } from '../Context/BookingContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';

class PlayerProfile extends Component {
  state = {
    player: {},
    userPetitions: this.props.user.petitions,
  };

  render() {
    const { name, surname, username, avatarImg, description, level } = this.props.user;

    return (
      <>
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>Edit Player Profile</h1>
        </div>
        <div id="profile-stats-card">
          <img id="user-profile-stats" src={avatarImg} alt="profile" />
          <div id="profile-stats">
            <p>
              <span>Games</span>
              <br />0
            </p>
            <p>
              <span>Won</span>
              <br />0
            </p>
            <p>
              <span>Lost</span>
              <br />0
            </p>
          </div>
          <h2 style={{ margin: '20px 0 10px 20px' }}>About</h2>
          <p>{description}</p>
          <h2 style={{ margin: '20px 0 10px 20px' }}>Level</h2>
          <p>{level}</p>
        </div>
        <div id="submit-reservation">
          <input type="submit" value="Edit Stats" onClick={this.handleBookingDelete} id="submit-datapicker" />
        </div>
      </>
    );
  }
}

export default withAuth(withBooking(PlayerProfile));
