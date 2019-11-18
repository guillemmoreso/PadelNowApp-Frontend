import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import profileService from '../../services/profileService';

class Petitions extends Component {
  state = {
    userPetitions: this.props.user.petitions,
  };

  //   acceptPetition = id => {
  //     profileService.acceptPetition(id).then(response => {
  //       this.setState({
  //         userPetitions: response.updatedUser.petitions,
  //       });
  //     });
  //     this.props.handleProfileUpdate();
  //   };

  acceptPetition = () => {
    profileService.acceptPetition(this.props.petition).then(response => {
      this.setState({
        userPetitions: response.updatedUser.petitions,
      });
    });
  };

  //   denyPetition = id => {
  //     profileService.denyPetition(id).then(response => {
  //       this.setState({
  //         userPetitions: response.updatedUser.petitions,
  //       });
  //     });
  //   };

  denyPetition = () => {
    profileService.denyPetition(this.props.petition).then(response => {
      this.setState({
        userPetitions: response.updatedUser.petitions,
      });
    });
  };

  render() {
    console.log('hola', this.friendPetitions);
    return (
      <>
        {this.props.petition && (
          <>
            <div id="petitions-btn">
              <div id="petition-span-btn" onClick={this.acceptPetition}>
                Accept
              </div>
              <div
                id="petition-span-btn"
                onClick={() => {
                  this.denyPetition(this.props.petition);
                }}
                style={{ backgroundColor: 'rgb(237, 92, 115)' }}
              >
                Deny
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default withAuth(Petitions);
