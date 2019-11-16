import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';

class PlayerStatus extends Component {
  state = {
    playerInfo: {},
    userPetitions: this.props.user.petitions,
    isLoading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    try {
      const playerInfo = await profileService.getUserById(id);
      this.setState({
        playerInfo,
        isLoading: false,
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
    const { player, games } = this.state.playerInfo;
    const { userPetitions, isLoading } = this.state;
    console.log('games', games);

    return (
      <>
        {!isLoading && (
          <>
            <div id="page-name">
              <Backbar history={this.props.history} />
              <h1>{player.username}</h1>
            </div>
            <h1>Games:{games.length}</h1>
            <h1>Won:{games.gameResult === 'Won'}</h1>
            <h1>Lost:{games.length}</h1>
          </>
        )}
        {!isLoading && games ? (
          <p>{games.filter(({ gameResult }) => gameResult === 'Won').length}</p>
        ) : // games.map(result => {
        //   return <p>{result.gameResult.filter(({ gameResult }) => gameResult === 'Won').length}</p>;
        // })
        null}
      </>
    );
  }
}

export default withAuth(PlayerStatus);
