import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import SearchClubs from '../components/SearchClubs';
import ClubsCards from '../components/ClubsCards';
import clubsService from '../services/clubsService';

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
    const { clubs } = this.state;

    return (
      <>
        <div id="full-mobile-page">
          <navbar>
            <img id="logo-large" src="../../images/logo-playtomic-dkv-color.png"></img>
          </navbar>
          <div id="home-banner">
            <div id="home-banner-title">
              <h1>Book your padel court easily with PadelNow!</h1>
            </div>
            <div id="home-banner-text">Find all available courts in the bests clubs!</div>
            <div id="home-banner-search">
              <div id="home-search">
                <a id="map-btn-div">
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

              {/* <div id="highlight-clubs-card">
                <img id="highlight-clubs-card-img" src="../../images/padel-example.jpeg"></img>
                <div id="highlight-clubs-card-content">
                  <h3>Club tenis la Salut</h3>
                  <p>Avenida de bla bla bla</p>
                  <a id="home-book-btn-div">
                    <div id="home-book-btn">Book now</div>
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(Homepage);
