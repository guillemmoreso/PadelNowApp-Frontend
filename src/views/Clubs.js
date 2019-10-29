import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';
import ClubsCards from '../components/ClubsCards';

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
    const { clubs, isLoading } = this.state;
    console.log('clubs', clubs);
    return (
      <>
        <div id="viewport-with-navbar">
          <div id="page-name">
            <span>Clubs</span>
          </div>
          <ClubsCards />
        </div>
      </>
    );
  }
}

export default withAuth(Clubs);
