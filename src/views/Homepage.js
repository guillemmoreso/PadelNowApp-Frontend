import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import searchService from '../services/searchService';
import SearchInput from '../components/Search/SearchInput';

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
    const { clubs } = this.state;

    return (
      <>
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
            {/* <h3> Top Clubs in Barcelona:</h3> */}

            {clubs.length > 0 ? (
              clubs.map(club => {
                if (club.name.toLowerCase().includes(this.state.value.toLowerCase())) {
                  return (
                    <div id="highlight-clubs-card" key={club._id}>
                      <img id="highlight-clubs-card-img" src={club.clubImages[0]} alt="club-avatar"></img>
                      <div id="highlight-clubs-card-content">
                        <h2>{club.name}</h2>
                        <p id="home-club-text">{club.location}</p>
                        <Link id="home-book-btn-div" to="/login">
                          <div id="home-book-btn">
                            <h3>Book now</h3>
                          </div>
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
      </>
    );
  }
}

export default withAuth(Homepage);
