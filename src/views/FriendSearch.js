import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';
import Search from '../components/User/SearchUsers';

class FriendSearch extends Component {
  state = {
    value: '',
    allUsers: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const allUsers = await profileService.getAllUsers();
      this.setState({
        allUsers,
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
    const { isLoading, allUsers } = this.state;

    return (
      <>
        <div id="viewport-with-navbar">
          <div id="page-name">
            <Backbar history={this.props.history} />
            <h1>My Friends</h1>
          </div>
          <h1>FRIENDS SEARCH</h1>
          <div id="home-search">
            <Search filterClubs={this.filterClubs} />
          </div>
          {!isLoading && allUsers.length > 0
            ? allUsers.map(user => {
                if (user.name.toLowerCase().includes(this.state.value.toLowerCase()) && this.state.value.length > 0) {
                  return (
                    <div key={user._id}>
                      <h2>{user.name}</h2>
                      <Link to={`/player/${user._id}`}>See {user.name} player status</Link>
                    </div>
                  );
                }
                return null;
              })
            : null}
        </div>
      </>
    );
  }
}

export default withAuth(FriendSearch);
