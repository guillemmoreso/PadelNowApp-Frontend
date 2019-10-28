import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

class Profile extends Component {
  state = {
    img: '',
  };

  // eslint-disable-next-line class-methods-use-this
  render() {
    const { handleLogout } = this.props;

    return (
      <div className="profile-container">
        <div id="page-name">
          <span>Profile</span>
        </div>
        <img src="../../images/profile.svg" />
        <div id="logout-btn-div">
          <button onClick={handleLogout} id="logout-btn">
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default withAuth(Profile);
