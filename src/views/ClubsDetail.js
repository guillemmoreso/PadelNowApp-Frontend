import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';
import ClubsCardDetail from '../components/ClubsCardDetail';

class ClubsDetail extends Component {
  state = {
    club: {},
    userClubs: this.props.user.clubs,
    isLoading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    try {
      const club = await clubsService.getClubById(id);
      this.setState({
        club,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
      });
    }
  }

  saveClub = id => {
    clubsService.saveClub(id).then(response => {
      this.setState({
        userClubs: response.updatedUser.clubs,
      });
    });
  };

  render() {
    const { club, isLoading, userClubs } = this.state;
    console.log('userClubs', userClubs);
    const { name, location, price, openingHours, clubImages, _id } = this.state.club;

    // return <>{!isLoading && <ClubsCardDetail club={club} userClubs={userClubs} />}</>;
    return (
      <section className="club-detail-container">
        <div id="club-header-image">
          <img src={clubImages} alt="club-avatar"></img>
        </div>
        <h1 id="club-detail-header">{name}</h1>
        <p>{location}</p>
        <p>Court Price: {price}€</p>
        {userClubs.includes(_id) ? (
          <span
            className="heart"
            onClick={() => {
              this.saveClub(_id);
            }}
          >
            <img src="/images/heart-circle-full.svg" alt="Spot saved" />
          </span>
        ) : (
          <span
            className="heart"
            onClick={() => {
              this.saveClub(_id);
            }}
          >
            <img src="/images/heart-circle-empty.svg" alt="Spot saved" />
          </span>
        )}
      </section>
    );
  }
}

export default withAuth(ClubsDetail);
