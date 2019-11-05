import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
// import clubsService from '../services/clubsService';
import bookingsService from '../services/bookingsService';

import BookingDescription from '../components/BookingDescription';

class BookingDetail extends Component {
  state = {
    club: {},
    booking: {},
    isLoading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    try {
      const club = await bookingsService.getClubById(id);
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
    const { club, isLoading } = this.state;
    return <>{!isLoading && <BookingDescription club={club} />}</>;
  }
}

export default withAuth(BookingDetail);
