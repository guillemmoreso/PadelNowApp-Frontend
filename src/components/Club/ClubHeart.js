import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import clubsService from '../../services/clubsService';

class ClubHeart extends Component {
  state = {
    userClubs: this.props.user.clubs,
  };

  saveClub = id => {
    clubsService.saveClubToFavorites(id).then(response => {
      this.setState({
        userClubs: response.updatedUser.clubs,
      });
    });
  };

  render() {
    const { userClubs } = this.state;
    return (
      <>
        {userClubs.includes(this.props.club) ? (
          <span
            className="heart"
            onClick={() => {
              this.saveClub(this.props.club);
            }}
          >
            <img src="/images/heart-circle-full.svg" alt="Spot saved" />
          </span>
        ) : (
          <span
            className="heart"
            onClick={() => {
              this.saveClub(this.props.club);
            }}
          >
            <img src="/images/heart-circle-empty.svg" alt="Spot saved" />
          </span>
        )}
      </>
    );
  }
}

export default withAuth(ClubHeart);
