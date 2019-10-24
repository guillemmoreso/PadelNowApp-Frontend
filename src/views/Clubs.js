import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';

class Clubs extends Component {
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
        <header className="header-clubs">
          <h1>Clubs</h1>
        </header>
        {!isLoading &&
          clubs.map(club => {
            return (
              <div key={club._id}>
                <Link to={`/clubs/${club._id}`}>{club.name}</Link>
              </div>
            );
          })}
        {isLoading && <div>loading...</div>}
      </>
    );
  }
}

export default withAuth(Clubs);
