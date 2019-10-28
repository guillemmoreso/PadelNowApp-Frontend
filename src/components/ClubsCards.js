import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';

class ClubsCards extends Component {
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
    return (
      <>
        {!isLoading &&
          clubs.map(club => {
            return (
              <div id="highlight-clubs-card" key={club._id}>
                <img id="highlight-clubs-card-img" src={club.clubImages[0]} alt="club-avatar"></img>
                <div id="highlight-clubs-card-content">
                  <h3>{club.name}</h3>
                  <p id="home-club-text">{club.location}</p>
                  <Link id="home-book-btn-div" to="/login">
                    {/* <Link id="home-book-btn-div" to={`/clubs/${club._id}`}> */}
                    <div id="home-book-btn">Book now</div>
                  </Link>
                </div>
              </div>
            );
          })}
      </>
    );
  }
}

export default withAuth(ClubsCards);
