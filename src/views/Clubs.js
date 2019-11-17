import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';
import ClubsCards from '../components/Club/ClubsCards';
import Backbar from '../components/Navigation/Backbar';

class Clubs extends Component {
  state = {
    clubs: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const clubs = await clubsService.getAllClubs();
      this.setState({
        clubs,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoading } = this.state;
    return (
      <>
        {!isLoading && (
          <div id="viewport-with-navbar">
            <div id="page-name">
              <Backbar history={this.props.history} />
              <h1>Clubs</h1>
            </div>
            <ClubsCards />
          </div>
        )}
      </>
    );
  }
}

export default withAuth(Clubs);
