import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

class Profile extends Component {
  state = {
    img: '',
  };

  render() {
    const { handleLogout } = this.props;
    const { name, surname } = this.props.user;

    return (
      <div id="viewport-with-navbar">
        <div id="profile-bg">
          <h1>
            {name} {surname}
          </h1>
          <img
            id="user-profile"
            src="https://www.worldpadeltour.com/media-content/2019/07/francisco-navarro-compn-4f278b973c-220x260.JPG"
            alt="profile"
          />
        </div>
        <div id="other-features">
          <Link id="profile-btn-div" to={'/player'}>
            <div id="profile-btn">
              <p>My Player status</p>
            </div>
            <div>
              <img id="category-img" src="../../images/club-profile.svg" alt="location"></img>
            </div>
          </Link>
          <Link id="profile-btn-div" to={'/clubs'}>
            <div id="profile-btn">
              <p>List of Clubs</p>
            </div>
            <div>
              <img id="category-img" src="../../images/club-profile.svg" alt="location"></img>
            </div>
          </Link>
          <Link id="profile-btn-div" to={'/profile/favorites'}>
            <div id="profile-btn">
              <p>My Favorite Clubs</p>
            </div>
            <div>
              <img id="category-img" src="../../images/heart-profile.svg" alt="heart"></img>
            </div>
          </Link>
          <Link id="profile-btn-div" to={'/profile/results'}>
            <div id="profile-btn">
              <p>My Results</p>
            </div>
            <div>
              <img id="category-img" src="../../images/versus-profile.svg" alt="versus"></img>
            </div>
          </Link>
          <Link id="profile-btn-div" to={'/profile/edit-profile'}>
            <div id="profile-btn">
              <p>Edit Profile</p>
            </div>
            <div>
              <img id="category-img" src="../../images/edit-profile.svg" alt="edit-profile"></img>
            </div>
          </Link>
          <Link id="profile-btn-div" to={'/profile/friends'}>
            <div id="profile-btn">
              <p>Manage Friends</p>
            </div>
            <div>
              <img id="category-img" src="../../images/podium.svg" alt="edit-profile"></img>
            </div>
          </Link>
        </div>

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
