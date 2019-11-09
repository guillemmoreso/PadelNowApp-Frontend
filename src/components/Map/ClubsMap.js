import 'mapbox-gl/dist/mapbox-gl.css';
import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { withAuth } from '../../Context/AuthContext';
import clubsService from '../../services/clubsService';

class PadelClubsMap extends Component {
  state = {
    viewport: {
      latitude: 41.3828939,
      longitude: 2.1774322,
      zoom: 11,
    },
    clubs: [],
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

  // Avoid viewport to be fixed
  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
    });
  };

  render() {
    const { viewport } = this.state;
    return (
      <>
        <div id="mapbox">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={this.handleViewportChange}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            width="100%"
            height="100vh"
          />
        </div>
      </>
    );
  }
}

export default withAuth(PadelClubsMap);
