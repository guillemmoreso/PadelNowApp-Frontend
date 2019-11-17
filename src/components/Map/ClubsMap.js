import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { Component } from 'react';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { withAuth } from '../../Context/AuthContext';
import clubsService from '../../services/clubsService';
import ClubMarker from './ClubMarker';

const geolocateStyle = {
  float: 'right',
  margin: '10px',
  padding: '10px',
  boxShadow: '0 0 10px 2px rgba(0,0,0,.1)',
};

class PadelClubsMap extends Component {
  state = {
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 11,
    },
    clubs: [],
    popupsStatus: false,
  };

  // GET all clubs data
  getClubs = async () => {
    const response = await clubsService.getAllClubs();
    return response;
  };

  // Mount map with the current user location
  componentDidMount() {
    this.getClubs().then(clubs => {
      this.setState({
        viewport: {
          latitude: 41.3828939,
          longitude: 2.1774322,
          zoom: 11,
        },
        clubs,
      });
    });
  }

  popupsToggle = () => {
    const { popupsStatus } = this.state;
    this.setState({
      popupsStatus: !this.state.popupsStatus,
    });
  };

  // Close all popups if a click is done anywhere in the map but the opened popup
  closeAllPopups = () => {
    const { popupsStatus } = this.state;
    if (popupsStatus) {
      this.setState({
        popupsStatus: false,
      });
    }
  };

  mapRef = React.createRef();

  // Rerenders viewport to avoid a static map
  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
    });
  };

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  render() {
    const { viewport, clubs, popupsStatus } = this.state;
    return (
      <>
        <div id="mapbox">
          <ReactMapGL
            ref={this.mapRef}
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={this.handleViewportChange}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            width="100%"
            height="100vh"
          >
            <Geocoder
              mapRef={this.mapRef}
              onViewportChange={this.handleGeocoderViewportChange}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              position="top-left"
              proximity={{ longitude: viewport.longitude, latitude: viewport.latitude }}
              trackProximity={true}
              collapsed={true}
            />

            <GeolocateControl
              style={geolocateStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
            {clubs.map((club, i) => {
              return (
                <ClubMarker
                  key={i}
                  id={club._id}
                  latitude={club.geometry.coordinates[0]}
                  longitude={club.geometry.coordinates[1]}
                  clubName={club.name}
                  img={club.clubImages[0]}
                  popupsToggle={this.popupsToggle}
                  zoom={viewport.zoom}
                  {...this.props}
                ></ClubMarker>
              );
            })}
          </ReactMapGL>
        </div>
      </>
    );
  }
}

export default withAuth(PadelClubsMap);
