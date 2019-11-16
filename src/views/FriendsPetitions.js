import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';

class Friends extends Component {
  state = {
    petitions: [],
  };

  async componentDidMount() {
    try {
      const petitions = await profileService.getPetitions();
      this.setState({
        petitions,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { userFriends, isLoading, allUsers } = this.props.user.petitions;

    return (
      <>
        <div id="viewport-with-navbar">
          <div id="page-name">
            <Backbar history={this.props.history} />
            <h1>My Friends</h1>
          </div>
          <h1>Petitions pending:</h1>
          <p>{this.props.user.petitions}</p>
        </div>
      </>
    );
  }
}

export default withAuth(Friends);
