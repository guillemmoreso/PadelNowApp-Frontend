import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';
import Backbar from '../components/Navigation/Backbar';

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
    clubsService.saveClubToFavorites(id).then(response => {
      this.setState({
        userClubs: response.updatedUser.clubs,
      });
    });
  };

  render() {
    const { userClubs } = this.state;
    const { name, location, clubImages, _id } = this.state.club;

    return (
      <section className="club-detail-container">
        <div id="page-name">
          <Backbar history={this.props.history} />
          <h1>{name}</h1>
        </div>
        <div id="club-header-image">
          <img src={clubImages} alt="club-avatar"></img>
        </div>
        <h1 id="club-detail-header">{name}</h1>
        <div id="club-detail-location">
          <p>{location}</p>
          <img src="/../../images/map.svg" alt="map-icon"></img>
        </div>
        {/* <p>Court Price: {price}€</p> */}
        <div id="club-detail-heart">
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
        </div>
      </section>
    );
  }
}

export default withAuth(ClubsDetail);
