import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import { withBooking } from '../Context/BookingContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';

class PlayerStatus extends Component {
  state = {
    player: {},
    userPetitions: this.props.user.petitions,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    try {
      const player = await profileService.getUserById(id);
      this.setState({
        player,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendPetition = id => {
    profileService.savePetition(id).then(response => {
      this.setState({
        userPetitions: response.updatedUser.petitions,
      });
    });
  };

  render() {
    const { name, surname, username, avatarImg, friends, _id } = this.state.player;
    const { userPetitions } = this.state;

    return (
      <>
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>{name}</h1>
        </div>
        <p>{_id}</p>
        <p>{this.props.user._id}</p>
        <span
          onClick={() => {
            this.sendPetition(_id);
          }}
        >
          Send petition
        </span>

        {/* {!userPetitions ? <p>Adeu</p> : this.props.user._id === _id ? <p>petition sent</p> : <p>sent petition</p>} */}
      </>
    );
  }
}

export default withAuth(withBooking(PlayerStatus));
