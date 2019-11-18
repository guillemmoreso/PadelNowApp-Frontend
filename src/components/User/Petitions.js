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

  denyPetition = id => {
    profileService.denyPetition(id).then(response => {
      this.setState({
        userPetitions: response.updatedUser.petitions,
      });
    });
  };

  render() {
    return (
      <>
        {this.props.petition && (
          <>
            <div
              id="home-book-btn"
              onClick={() => {
                this.acceptPetition(this.props.petition);
              }}
            >
              Accept
            </div>
            <div
              id="home-book-btn"
              onClick={() => {
                this.denyPetition(this.props.petition);
              }}
              style={{ backgroundColor: 'rgb(237, 92, 115)' }}
            >
              Deny
            </div>
          </>
        )}
      </>
    );
  }
}

export default withAuth(Petitions);
