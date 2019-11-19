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
    level: this.props.user.level,
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
      this.setState({ level: profilelevel });
      toast.info('Profile Level Updated');
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

  render() {
    const { player, games } = this.state;
    const { isLoading } = this.state;
    const { id } = this.props.match.params;
    return (
      <>
        {!isLoading && player ? (
          <>
            <div id="page-name">
              <Backbar history={this.props.history} />
              <h1 style={{ textTransform: 'capitalize' }}>{player.username} Stats</h1>
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
              {this.props.user._id === id && this.props.user.level === 'Undefined' ? (
                <form onSubmit={this.handleFormSubmit}>
                  <h2>Choose Level</h2>
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
              ) : (
                <>
                  <h2 style={{ textAlign: 'start' }}>Level</h2>
                  <p id="inserted-stat">{player.level}</p>
                </>
              )}
              <h2 style={{ textAlign: 'start' }}>Badges Unlocked</h2>
              <div>
                <div id="badges">
                  <ul>
                    {player.level != 'Undefined' && (
                      <li>
                        <img id="badge-img" src="../../images/badge.svg" alt="badge" />
                        <p>{player.level}</p>
                      </li>
                    )}
                    {player.friends.length > 0 && (
                      <li>
                        <img id="badge-img" src="../../images/reward.svg" alt="reward" />
                        <p>Friends</p>
                      </li>
                    )}
                    {games.length > 0 && (
                      <li>
                        <img id="badge-img" src="../../images/discount.svg" alt="discount" />
                        <p>Discount</p>
                      </li>
                    )}

                    <li>
                      <img id="badge-img" src="../../images/approved-signal.svg" alt="okey" />
                      <p>Verified</p>
                    </li>
                  </ul>
                </div>
              </div>
              {this.props.user._id === player._id && (
                <Link to={'/player'}>
                  <div id="submit-reservation" style={{ marginTop: '50px' }}>
                    <button id="submit-datapicker">Edit Stats</button>
                  </div>
                </Link>
              )}
            </div>
          </>
        ) : null}
      </>
    );
  }
}

export default withAuth(PlayerStatus);
