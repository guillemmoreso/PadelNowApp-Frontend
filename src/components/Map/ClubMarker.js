import React, { Component } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { Link } from 'react-router-dom';
import LocationIcon from './LocationIcon';

class ClubMarker extends Component {
  state = {
    showPopup: false,
  };

  togglePopup = () => {
    // const { popupsToggle } = this.props;
    // popupsToggle();
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  render() {
    const { id, latitude, longitude, clubName, img } = this.props;
    const { showPopup } = this.state;
    return (
      <>
        <div onClick={this.togglePopup}>
          <Marker className={'club-marker'} key={`marker-${id}`} latitude={latitude} longitude={longitude}>
            <LocationIcon />
          </Marker>
        </div>
        {showPopup ? (
          <Popup className="club-popup-container" key={`popup-${id}`} latitude={latitude} longitude={longitude}>
            <Link to={`/clubs/${id}`}>
              <div className="club-popup-image">
                <img src={img} alt={clubName} />
              </div>
              <div className="club-popup-title">
                <p>{clubName}</p>
              </div>
            </Link>
          </Popup>
        ) : null}
      </>
    );
  }
}

export default ClubMarker;
