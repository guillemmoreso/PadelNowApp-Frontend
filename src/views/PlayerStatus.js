import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';

class PlayerStatus extends Component {
  state = {
    player: [],
    games: [],
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
      console.log(playerInfo.games);
      this.setState({
        player: playerInfo.player,
        games: playerInfo.games,
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
    const { player, games } = this.state;
    const { userPetitions, isLoading } = this.state;

    return (
      <>
        {!isLoading && player ? (
          <>
            <div id="page-name">
              <Backbar history={this.props.history} />
              <h1>{player.username}</h1>
            </div>
            <h1>Games:{games.length}</h1>
            <h1>Won:{games.gameResult === 'Won'}</h1>
            <h1>Lost:{games.length}</h1>
            {/* {this.state.player.map(user => {
              return <p>{user.username}</p>;
            })} */}
          </>
        ) : null}
        {!isLoading && games ? (
          <p>{games.filter(({ gameResult }) => gameResult === 'Won').length}</p>
        ) : // games.map(result => {
        //   return <p>{result.gameResult.filter(({ gameResult }) => gameResult === 'Won').length}</p>;
        // })
        null}
        {!isLoading && (
          <span
            onClick={() => {
              this.sendPetition(player._id);
            }}
            style={{ backgroundColor: 'blue', color: 'white' }}
          >
            Send petition
          </span>
        )}
      </>
    );
  }
}

export default withAuth(PlayerStatus);
