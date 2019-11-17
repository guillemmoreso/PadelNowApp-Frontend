import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';
import Search from '../components/User/SearchUsers';

class Friends extends Component {
  state = {
    allUsers: [],
    value: '',
    userFriends: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const allUsers = await profileService.getAllUsers();
      const userFriends = await profileService.getAllUserFriends();
      console.log('userFriends', userFriends);
      this.setState({
        allUsers,
        userFriends,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  filterClubs = value => {
    this.setState({
      value,
    });
  };

  render() {
    const { userFriends, isLoading, allUsers } = this.state;
    console.log(userFriends);
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
          {userFriends &&
            userFriends.map(friend => {
              return (
                <div id="highlight-clubs-card" key={friend._id}>
                  <div>
                    <h1 id="club-name-card">{friend.name}</h1>
                    <img src={friend.avatarImg}></img>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default withAuth(Friends);
