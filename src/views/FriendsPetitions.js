import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';
import Petitions from '../components/User/Petitions';

class Friends extends Component {
  state = {
    petitions: {},
    isLoading: true,
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
    const { petitions, isLoading } = this.state;
    return (
      <>
        <div id="viewport-with-navbar">
          <div id="page-name">
            <Backbar history={this.props.history} />
            <h1>My Petitions</h1>
          </div>
          <h1>Petitions pending:</h1>
          {!isLoading &&
            petitions.map(petition => {
              return (
                <div id="highlight-clubs-card" key={petition._id}>
                  <div>
                    <h1 id="club-name-card">{petition.name}</h1>
                    <Petitions petition={petition._id} />
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
