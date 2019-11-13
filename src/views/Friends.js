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

    return (
      <>
        <div id="viewport-with-navbar">
          <div id="page-name">
            <Backbar history={this.props.history} />
            <h1>My Friends</h1>
          </div>
          <div>Friends</div>
          <div>Petitions</div>
          <div>Search</div>
          <h1>FRIENDS</h1>
          <div id="home-search">
            <Search filterClubs={this.filterClubs} />
          </div>
          {allUsers.length > 0 ? (
            allUsers.map(club => {
              if (club.name.toLowerCase().includes(this.state.value.toLowerCase()) && this.state.value.length > 0) {
                return (
                  <div key={club._id}>
                    <h2>{club.name}</h2>
                  </div>
                );
              }
              return null;
            })
          ) : (
            <p>Server Error...</p>
          )}
          {/* {!isLoading &&
            userFriends.map(club => {
              return (
                <div id="highlight-clubs-card" key={club._id}>
                  <div>
                    <Link id="home-book-btn-div" to={`/profile/user/${club._id}`}>
                      <h3>{club.name}</h3>
                    </Link>
                  </div>
                </div>
              );
            })}
          <h1>All USERS</h1>
          {!isLoading &&
            allUsers.map(club => {
              return (
                <div id="highlight-clubs-card" key={club._id}>
                  <div>
                    <Link id="home-book-btn-div" to={`/profile/user/${club._id}`}>
                      <h3>{club.name}</h3>
                    </Link>
                  </div>
                </div>
              );
            })} */}
        </div>
      </>
    );
  }
}

export default withAuth(Friends);
