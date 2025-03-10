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
    userPetitions: this.props.user.petitions,
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

  sendPetition = id => {
    profileService.savePetition(id).then(response => {
      // this.setState({
      //   userPetitions: response.updatedUser.petitions,
      // });
    });
  };

  render() {
    const { isLoading, allUsers } = this.state;

    return (
      <>
        <div id="viewport-with-navbar">
          <div id="page-name">
            <Backbar history={this.props.history} />
            <h1>Explore Players</h1>
          </div>
          <div id="home-search">
            <Search filterClubs={this.filterClubs} />
          </div>
          {!isLoading && allUsers.length > 0
            ? allUsers.map(user => {
                if (user.name.toLowerCase().includes(this.state.value.toLowerCase()) && this.state.value.length > 0) {
                  return (
                    <div id="myfriends-card" key={user._id}>
                      <Link to={`/player/${user._id}`} style={{ textDecoration: 'none' }}>
                        <img id="user-profile-friends" src={user.avatarImg} alt="friend-avatar"></img>
                      </Link>
                      <div id="friend-btn-div">
                        <p style={{ fontWeight: 'bold' }}>{user.username}</p>
                        <p id="friend-name-card">
                          {user.name} {user.surname}
                        </p>
                        {this.props.user._id === user._id || user.petitions.includes(this.props.user._id) ? (
                          <span
                            id="petition-span"
                            onClick={() => {
                              this.props.history.push(`/player/${user._id}`);
                            }}
                          >
                            See user Stats
                          </span>
                        ) : (
                          <span
                            id="petition-span"
                            onClick={() => {
                              this.sendPetition(user._id);
                              this.props.history.push(`/player/${user._id}`);
                            }}
                          >
                            Send Petition
                          </span>
                        )}
                      </div>
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
