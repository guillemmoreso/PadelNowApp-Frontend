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
      console.log('player', player);
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
    const { name, surname, username, avatarImg, friends, _id, description, level, games } = this.state.player;
    const { userPetitions } = this.state;
    console.log('playeer', games);

    return (
      <>
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>{username}</h1>
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
          <h2 style={{ margin: '20px 0 10px 20px', fontSize: '19px' }}>
            About {name} {surname}
          </h2>
          <p style={{ color: '#808080', margin: '0 20px' }}>{description}</p>
          <h2 style={{ margin: '20px 0 10px 20px' }}>Level</h2>
          <p style={{ color: '#808080', margin: '0 20px' }}>{level}</p>
        </div>
        <Link to={'/player'}>
          <div id="submit-reservation">
            <input type="submit" value="Edit Stats" id="submit-datapicker" />
          </div>
        </Link>

        {/* PONER CONDICION IF USER --> EDIT USER SINO STAT OF PETITION */}
        {/* <span
          onClick={() => {
            this.sendPetition(_id);
          }}
        >
          Send petition
        </span> */}

        {/* {!userPetitions ? <p>Adeu</p> : this.props.user._id === _id ? <p>petition sent</p> : <p>sent petition</p>} */}
      </>
    );
  }
}

export default withAuth(withBooking(PlayerStatus));
