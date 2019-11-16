import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withAuth } from '../Context/AuthContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';

class PlayerStatus extends Component {
  state = {
    player: [],
    games: [],
    userPetitions: this.props.user.petitions,
    isLoading: true,
    level: this.props.user.level,
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

  handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const userId = this.props.user._id;
      const { level } = this.state;
      const profilelevel = await profileService.profileStats({ level, userId });
      console.log('submit', profilelevel);
      toast.info('Profile Level Updated');
      this.setState({ level: profilelevel });
      this.props.history.push('/profile');
    } catch (error) {
      console.error('Error while inserting Game Result');
    }
  };

  handleLevel = event => {
    switch (event.target.value) {
      case 'Beginner':
        this.setState({ level: 'Beginner' });
        break;
      case 'Intermediate':
        this.setState({ level: 'Beginner' });
        break;
      case 'Advanced':
        this.setState({ level: 'Advanced' });
        break;
      case 'Pro':
        this.setState({ level: 'Pro' });
        break;
      default:
        this.setState({ level: 'Unknown' });
    }
  };

  sendPetition = id => {
    profileService.savePetition(id).then(response => {
      this.setState({
        userPetitions: response.updatedUser.petitions,
      });
    });
  };

  render() {
    const { player, games, level } = this.state;
    const { userPetitions, isLoading } = this.state;
    return (
      <>
        {!isLoading && player ? (
          <>
            <div id="page-name">
              <Backbar history={this.props.history} />
              <h1>{player.username} Stats</h1>
            </div>
          </>
        ) : null}
        {!isLoading && games ? (
          <>
            <div id="profile-stats-card">
              <img id="user-profile-stats" src={player.avatarImg} alt="profile" />
              <div id="profile-stats">
                <p>
                  <span>Games</span>
                  <br />
                  {games.length}
                </p>
                <p>
                  <span>Won</span>
                  <br />
                  {!isLoading && games ? <p>{games.filter(({ gameResult }) => gameResult === 'Won').length}</p> : null}
                </p>
                <p>
                  <span>Lost</span>
                  <br />
                  {!isLoading && games ? <p>{games.filter(({ gameResult }) => gameResult === 'Lost').length}</p> : null}
                </p>
              </div>
              {this.props.user._id === player._id && this.props.user.level === 'Undefined' ? (
                <div id="profile-stats-card" style={{ marginTop: '5%' }}>
                  <form onSubmit={this.handleFormSubmit}>
                    <h2 style={{ margin: '20px 0 10px 20px' }}>Choose Level</h2>
                    <select id="selector" onChange={this.handleLevel}>
                      <option value="--" defaultValue>
                        --
                      </option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Pro">Pro</option>
                    </select>
                    <div id="submit-reservation">
                      <input type="submit" value="Submit Stats" id="submit-datapicker" />
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <h2 style={{ margin: '20px 0 10px 20px' }}>Level</h2>
                  <p style={{ color: '#808080', margin: '0 20px' }}>{player.level}</p>
                  {/* {this.props.user._id === player._id && level !== 'Undefined' ? (
                    <p onClick={(() => this.setState({ level: 'Undefined' }), this.handleLevel, this.handleFormSubmit)}>
                      Edit
                    </p>
                  ) : null} */}
                </>
              )}
            </div>
            {this.props.user._id === player._id ? (
              <Link to={'/player'}>
                <div id="submit-reservation">
                  <button id="submit-datapicker">Edit Stats</button>
                </div>
              </Link>
            ) : (
              <div
                id="submit-reservation"
                onClick={() => {
                  this.sendPetition(player._id);
                }}
              >
                Send petition
              </div>
            )}
          </>
        ) : null}
      </>
    );
  }
}

export default withAuth(PlayerStatus);
