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
          <Link to="/profile/friends/search">
            <div>Search</div>
          </Link>
          <Link to="/profile/friends/petitions">
            <div>Petitions</div>
          </Link>

          <h1>MY FRIENDS</h1>
          {!isLoading && userFriends.length > 0 ? (
            userFriends.map(friend => {
              return (
                <div id="highlight-clubs-card" key={friend._id}>
                  <div>
                    <h1 id="club-name-card">{friend.name}</h1>
                    <img src={friend.avatarImg} alt="friend-avatar"></img>
                  </div>
                </div>
              );
            })
          ) : (
            <p>NO FRIENDS...</p>
          )}
        </div>
      </>
    );
  }
}

export default withAuth(Friends);
