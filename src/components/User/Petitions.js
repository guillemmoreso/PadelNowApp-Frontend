import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import profileService from '../../services/profileService';

class Petitions extends Component {
  state = {
    userPetitions: this.props.user.petitions,
  };

  acceptPetition = id => {
    profileService.acceptPetition(id).then(response => {
      this.setState({
        userPetitions: response.updatedUser.petitions,
      });
    });
  };

  render() {
    return (
      <>
        <div
          id="home-book-btn"
          onClick={() => {
            this.acceptPetition(this.props.petition);
          }}
        >
          Accept
        </div>
      </>
    );
  }
}

export default withAuth(Petitions);
