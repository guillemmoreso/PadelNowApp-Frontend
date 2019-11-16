import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withAuth } from '../Context/AuthContext';

class Profile extends Component {
  state = {
    img: '',
  };

  onClickLogout = async () => {
    try {
      toast.info('Logout succesfully');
      this.props.handleLogout();
    } catch (error) {
      console.error('Error while logout ');
    }
  };

  onClickDelete = async () => {
    try {
      this.props.handleUserDelete();
      toast.warn('Account deleted');
    } catch (error) {
      console.error('Error while logout ');
    }
  };

  render() {
    // const { handleLogout, handleUserDelete } = this.props;
    const { name, surname, avatarImg, _id } = this.props.user;

    return (
      <div id="viewport-with-navbar">
        <div id="profile-bg">
          <h1>
            {name} {surname}
          </h1>
          <img id="user-profile" src={avatarImg} alt="profile" />
        </div>
        <div id="other-features">
          <Link id="profile-btn-div" to={`/player/${_id}`}>
            <div id="profile-btn">
              <p>My Stats</p>
            </div>
            <div>
              <img id="category-img" src="../../images/success.svg" alt="sucess"></img>
            </div>
          </Link>
          <Link id="profile-btn-div" to={'/search'}>
            <div id="profile-btn">
              <p>Search Availability</p>
            </div>
            <div>
              <img id="category-img" src="../../images/search.svg" alt="search" style={{ fill: '#2f3333' }}></img>
            </div>
          </Link>
          <Link id="profile-btn-div" to={'/clubs'}>
            <div id="profile-btn">
              <p>List of Clubs</p>
            </div>
            <div>
              <img id="category-img" src="../../images/address.svg" alt="address" style={{ fill: '#2f3333' }}></img>
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
          <Link id="profile-btn-div" to={'/profile/friends'}>
            <div id="profile-btn">
              <p>My Ranking</p>
            </div>
            <div>
              <img id="category-img" src="../../images/podium.svg" alt="podium" style={{ fill: '#2f3333' }}></img>
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
          <Link id="profile-btn-div" to={'/profile/friends/petitions'}>
            <div id="profile-btn">
              <p>Manage Friends</p>
            </div>
            <div>
              <img id="category-img" src="../../images/add-user.svg" alt="add-user"></img>
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
          <div id="profile-btn-div">
            <div id="profile-btn" onClick={this.onClickLogout}>
              <p>Logout</p>
            </div>
            <div>
              <img id="category-img" src="../../images/logout.svg" alt="logout"></img>
            </div>
          </div>
          <div id="profile-btn-div" style={{ borderBottom: 'none' }}>
            <div id="profile-btn" onClick={this.onClickDelete}>
              <p style={{ color: '#ff0000' }}>Delete Account</p>
            </div>
            <div>
              <img id="category-img" src="../../images/cancel-button.svg" alt="delete"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Profile);
