import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';
import SearchClubs from '../components/SearchClubs';
import ClubsCards from '../components/ClubsCards';
import { Link } from 'react-router-dom';

class Homepage extends Component {
  state = {
    clubs: [],

    isLoading: true,
  };

  // componentDidMount() {}
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

  handleQuery = query => {
    clubsService.getQuery(query).then(clubs => {
      this.setState({
        clubs,
      });
    });
  };

  render() {
    // const { clubs } = this.state;
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
                {/* <a href="/map" id="map-btn-div">
                  <div id="map-btn">Clubs near you</div>
                </a> */}
                <SearchClubs query={this.handleQuery} />
              </div>
            </div>
          </div>
          <div id="highlight-clubs">
            <div id="highlight-clubs-header">
              <h3> Top Clubs in Barcelona:</h3>
              {/* <ClubsCards /> */}
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
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(Homepage);
