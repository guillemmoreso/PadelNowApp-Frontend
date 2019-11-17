import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';
import SearchInput from '../components/Search/SearchInput';
import Loading from '../components/Loading/Loading-mini';

class Homepage extends Component {
  state = {
    clubs: [],
    value: '',
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

  filterClubs = value => {
    this.setState({
      value,
    });
  };

  render() {
    const { clubs, isLoading } = this.state;

    return (
      <>
        <div id="homepage-hero">
          <div id="logo-div">
            <div id="homepage-header">
              <img id="logo-large" src="../../images/padelnow-logo.png" alt="nav-avatar"></img>
              <div id="home-banner-title">
                <h1 id="headline">Book your padel court easily with PadelNow!</h1>
              </div>
              <div id="home-banner-text">Find all available courts in the bests clubs!</div>
              <div id="loading-div">
                <Loading />
              </div>
              <h2 id="headline">What are you waiting?</h2>
              <div id="login-signup-cta">
                <Link id="header-book-btn-div" to="/login">
                  <div id="header-book-btn">
                    <h3>Log in</h3>
                  </div>
                </Link>
                <Link id="header-book-btn-div" to="/signup">
                  <div id="header-book-btn">
                    <h3>Sign up</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div id="swipe-down-div">
          <p>Swipe down to continue on the website</p>
          <img src="../../images/expand-button.svg" alt="down-icon"></img>
        </div>

        <div id="home-banner">
          <div id="home-banner-search">
            <div id="home-search">
              <h3> Find your Club:</h3>
              <SearchInput filterClubs={this.filterClubs} />
            </div>
          </div>
        </div>
        <div id="highlight-clubs">
          <div id="highlight-clubs-header">
            {!isLoading && clubs.length > 0
              ? clubs.map(club => {
                  if (club.name.toLowerCase().includes(this.state.value.toLowerCase())) {
                    return (
                      <div id="highlight-clubs-card" key={club._id}>
                        <div
                          style={{
                            backgroundImage: `linear-gradient(180deg,transparent,rgba(0,0,0,.5)),url(${
                              club.clubImages[0]
                            })`,
                            height: '30vh',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'none',
                            borderTopLeftRadius: '5px',
                            borderTopRightRadius: '5px',
                          }}
                        ></div>
                        {/* <img id="highlight-clubs-card-img" src={club.clubImages[0]} alt="club-avatar"></img> */}
                        <div id="">
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
              : null}
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(Homepage);
