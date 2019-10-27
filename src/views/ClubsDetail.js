import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import clubsService from '../services/clubsService';
import ClubsCardDetail from '../components/ClubsCardDetail';

class ClubsDetail extends Component {
  state = {
    club: {},
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

  render() {
    const { club, isLoading } = this.state;
    return (
      <>
        {isLoading && <div>Loading...</div>}
        {!isLoading && <ClubsCardDetail club={club} />}
      </>
    );
  }
}

export default withAuth(ClubsDetail);
