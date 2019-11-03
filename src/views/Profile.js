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
    const { name, surname } = this.props.user;

    return (
      <div className="profile-container">
        <div id="page-name">
          <span>Profile</span>
        </div>
        <h1>
          {name} {surname}
        </h1>
        <img
          id="user-profile"
          src="https://www.worldpadeltour.com/media-content/2019/07/francisco-navarro-compn-4f278b973c-220x260.JPG"
        />
        <div id="other-features">
          <Link to={'/clubs'}>
            <div id="profile-categories">
              <p>List of Clubs</p>
              <div>
                <img id="category-img" src="../../images/placeholder.svg"></img>
              </div>
            </div>
          </Link>

          <Link to={'/profile/favorites'}>
            <div id="profile-categories">
              <p>My Favorite Clubs</p>
              <div>
                <img id="category-img" src="../../images/heart.svg"></img>
              </div>
            </div>
          </Link>
          <Link to={'/profile/results'}>
            <div id="profile-categories">
              <p>My Results</p>
              <div>
                <img id="category-img" src="../../images/versus.svg"></img>
              </div>
            </div>
          </Link>
          <Link to={'/profile/edit-profile'}>
            <div id="profile-categories">
              <p>Edit Profile</p>
              <div>
                <img id="category-img" src="../../images/resume.svg"></img>
              </div>
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
