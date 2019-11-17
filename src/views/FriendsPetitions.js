import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';

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
            <h1>My Friends</h1>
          </div>
          <h1>Petitions pending:</h1>
          {!isLoading &&
            petitions.map(petition => {
              return (
                <div id="highlight-clubs-card" key={petition._id}>
                  <div>
                    <h1 id="club-name-card">{petition.name}</h1>
                    <Link to={`/profile/friends/${petition._id}/accept`}>
                      <div id="home-book-btn">Accept</div>
                    </Link>
                    <div id="home-book-btn">Decline</div>
                    <Link id="home-book-btn-div" to={`/player/${petition._id}`}>
                      <div id="home-book-btn">See stats</div>
                    </Link>
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
