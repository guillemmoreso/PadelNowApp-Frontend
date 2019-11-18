import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';

class Friends extends Component {
  state = {
    userFriends: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const userFriends = await profileService.getAllUserFriends();
      this.setState({
        userFriends,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { userFriends, isLoading } = this.state;
    return (
      <>
        <div id="viewport-with-navbar">
          <div id="page-name">
            <Backbar history={this.props.history} />
            <h1>My Friends</h1>
          </div>

          {!isLoading && userFriends.length > 0 ? (
            userFriends.map(friend => {
              return (
                <div id="myfriends-card" key={friend._id}>
                  <Link to={`/player/${friend._id}`} style={{ textDecoration: 'none' }}>
                    <img id="user-profile-friends" src={friend.avatarImg} alt="friend-avatar"></img>
                  </Link>
                  <div id="friend-btn-div">
                    <p style={{ fontWeight: 'bold' }}>{friend.username}</p>
                    <p id="friend-name-card">
                      {friend.name} {friend.surname}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div id="missing-favorite-div">
              <Link id="home-book-btn-div" to={'/profile/friends/search'} style={{ textDecoration: 'none' }}>
                <img id="sorry-img" src="../../images/recruitment.svg" alt="location"></img>
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withAuth(Friends);
