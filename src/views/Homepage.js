import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

class Homepage extends Component {
  state = {
    clubs: [],
  };

  componentDidMount() {}

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
            <div id="home-banner-text">Book your court in the bests clubs in Barcelona!</div>
            <div id="home-banner-search">
              <div id="home-search">
                {/* AIXO HA DE SER UN SEARCHBAR */}
                <button type="button" className="button-search">
                  <div>Adress, Club, name, city</div>
                </button>
              </div>
            </div>
          </div>
          <div id="highlight-clubs">
            <div id="highlight-clubs-header">
              Top Clubs in Barcelona
              <div id="highlight-clubs-card">
                <img id="highlight-clubs-card-img" src="../../images/padel-example.jpeg"></img>

                <h1>Club tenis la Salut</h1>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(Homepage);
