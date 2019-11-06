import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';
import ClubsCards from '../components/ClubsCards';
import Backbar from '../components/Navigation/Backbar';

class Reservation extends Component {
  state = {
    club: {},
    isLoading: true,
    searchStartingHour: '',
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

  render() {
    const { club, isLoading, searchStartingHour } = this.state;
    const { name, location, price, openingHours, clubImages, _id, courts } = this.state.club;

    console.log('PROPS', this.state.club.courts);
    return (
      <>
        <h1 id="club-detail-header">{name}</h1>
        {/* <p>{courts[0].courtName}</p> */}
        <p>Court Price: {price}€</p>
      </>
    );
  }
}

export default withAuth(Reservation);
