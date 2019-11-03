import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';
import searchService from '../services/searchService';

import SearchClubs from '../components/SearchClubs';
import ClubsCards from '../components/ClubsCards';
import SearchInput from '../components/SearchInput';

import { Link } from 'react-router-dom';

class Homepage extends Component {
  state = {
    clubs: [],
    value: '',
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const clubs = await searchService.getClubsByHour();

      this.setState({
        clubs,
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
    const { clubs, isLoading } = this.state;

    return (
      <>
        <div id="full-mobile-page">
          <div id="logo-div">
            <img id="logo-large" src="../../images/padelnow-logo.png" alt="nav-avatar"></img>
          </div>
          <div id="home-banner">
            <div id="home-banner-title">
              <h1>Book your padel court easily with PadelNow!</h1>
            </div>
            <div id="home-banner-text">Find all available courts in the bests clubs!</div>
            <div id="home-banner-search">
              <div id="home-search">
                <SearchInput filterClubs={this.filterClubs} />
              </div>
            </div>
          </div>
          <div id="highlight-clubs">
            <div id="highlight-clubs-header">
              <h3> Top Clubs in Barcelona:</h3>

              {clubs.length > 0 ? (
                clubs.map(club => {
                  if (club.name.toLowerCase().includes(this.state.value.toLowerCase())) {
                    return (
                      <div id="highlight-clubs-card" key={club._id}>
                        <img id="highlight-clubs-card-img" src={club.clubImages[0]} alt="club-avatar"></img>
                        <div id="highlight-clubs-card-content">
                          <h3>{club.name}</h3>
                          <p id="home-club-text">{club.location}</p>
                          <Link id="home-book-btn-div" to="/login">
                            <div id="home-book-btn">Book now</div>
                          </Link>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <p>Server Error...</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(Homepage);
