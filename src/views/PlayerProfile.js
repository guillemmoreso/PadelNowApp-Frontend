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
    const { name, surname, username } = this.props.user;

    return (
      <>
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>Edit Player Profile</h1>
        </div>
        
  

      </>
    );
  }
}

export default withAuth(withBooking(PlayerProfile));
