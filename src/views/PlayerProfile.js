import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withAuth } from '../Context/AuthContext';
import { withBooking } from '../Context/BookingContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';

class PlayerProfile extends Component {
  state = {
    level: this.props.user.level,
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const { level } = this.state;
      const profilelevel = await profileService.profileStats({ level });
      toast.info('Game Result Submited');
      this.setState({ level: profilelevel });
      this.props.history.push(`/player/${this.props.user._id}`);
    } catch (error) {
      console.error('Error while inserting Game Result');
    }
  };

  // handleLevel = event => {
  //   if (event.target.value === 'Won') this.setState({ gameResult: 'Won' });
  //   else this.setState({ gameResult: 'Lost' });
  // };
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
    const { level } = this.state;
    return (
      <>
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>Edit Player Profile</h1>
        </div>
        {level && (
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
        )}
      </>
    );
  }
}

export default withAuth(withBooking(PlayerProfile));
