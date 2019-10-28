import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';
import SearchClubs from '../components/SearchClubs';
import ClubsCards from '../components/ClubsCards';

class Homepage extends Component {
  state = {
    clubs: [],
  };

  componentDidMount() {}

  handleQuery = query => {
    clubsService.getQuery(query).then(clubs => {
      this.setState({
        clubs,
      });
    });
  };

  render() {
    // const { clubs } = this.state;

    return (
      <>
        <div id="full-mobile-page">
          <div>
            <img id="logo-large" src="../../images/padelnow-logo.png" alt="nav-avatar"></img>
          </div>
          <div id="home-banner">
            <div id="home-banner-title">
              <h1>Book your padel court easily with PadelNow!</h1>
            </div>
            <div id="home-banner-text">Find all available courts in the bests clubs!</div>
            <div id="home-banner-search">
              <div id="home-search">
                <a href="/map" id="map-btn-div">
                  <div id="map-btn">Clubs near you</div>
                </a>
                <button type="button" className="button-search">
                  {/* <div>Adress, Club, name, city</div> */}
                  <SearchClubs query={this.handleQuery} />
                </button>
              </div>
            </div>
          </div>
          <div id="highlight-clubs">
            <div id="highlight-clubs-header">
              <h3> Top Clubs in Barcelona:</h3>
              <ClubsCards />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(Homepage);
