import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import profileService from '../services/profileService';
import Backbar from '../components/Navigation/Backbar';
import ClubHeart from '../components/Club/ClubHeart';

class FavoriteClubs extends Component {
  state = {
    clubs: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const clubs = await profileService.getAllFavoriteClubs();
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
        <div id="viewport-with-navbar">
          <div id="page-name">
            <Backbar history={this.props.history} />
            <h1>Favorite Clubs</h1>
          </div>
          {!isLoading &&
            clubs.map(club => {
              return (
                <div id="highlight-clubs-card" key={club._id}>
                  <img id="highlight-clubs-card-img" src={club.clubImages[0]} alt="club-avatar"></img>
                  <ClubHeart club={club._id} />
                  <div>
                    <h3>{club.name}</h3>
                    <p id="home-club-text">{club.location}</p>

                    <Link id="home-book-btn-div" to={`/clubs/${club._id}`}>
                      <div id="home-book-btn">Book now</div>
                    </Link>
                  </div>
                </div>
              );
            })}
          {clubs.length === 0 && (
            <>
              <div id="missing-favorite-div">
                <img id="sorry-img" src="../../images/club-favorite.svg" alt="location"></img>
                <h2>Still waiting your Crush? </h2>
                <Link id="home-book-btn-div" to={'/clubs'}>
                  <div id="home-book-btn">Select Favorite Clubs</div>
                </Link>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default withAuth(FavoriteClubs);
