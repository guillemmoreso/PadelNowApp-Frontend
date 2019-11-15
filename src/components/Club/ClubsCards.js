import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import clubsService from '../../services/clubsService';
import ClubHeart from './ClubHeart';
import SearchInput from '../Search/SearchInput';

class ClubsCards extends Component {
  state = {
    clubs: [],
    isLoading: true,
    value: '',
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

  saveClub = id => {
    clubsService.saveClubToFavorites(id).then(response => {
      this.setState({
        userClubs: response.updatedUser.clubs,
      });
    });
  };

  filterClubs = value => {
    this.setState({
      value,
    });
  };

  render() {
    const { clubs, isLoading } = this.state;
    return (
      <>
        <SearchInput filterClubs={this.filterClubs} />
        {!isLoading &&
          clubs.map(club => {
            if (club.name.toLowerCase().includes(this.state.value.toLowerCase()))
              return (
                <div id="highlight-clubs-card" key={club._id}>
                  <img id="highlight-clubs-card-img" src={club.clubImages[0]} alt="club-avatar"></img>
                  <ClubHeart club={club._id} />

                  <div>
                    <h1 id="club-name-card">{club.name}</h1>
                    <p id="home-club-text">{club.location}</p>

                    {/* <Link id="home-book-btn-div" to="/login"> */}
                    <Link id="home-book-btn-div" to={`/clubs/${club._id}`}>
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
