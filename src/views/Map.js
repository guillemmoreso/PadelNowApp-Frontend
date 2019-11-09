import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import ClubsMap from '../components/Map/ClubsMap';

class PadelClubsMap extends Component {
  render() {
    return (
      <>
        <ClubsMap prop={this.props} />
      </>
    );
  }
}

export default withAuth(PadelClubsMap);
