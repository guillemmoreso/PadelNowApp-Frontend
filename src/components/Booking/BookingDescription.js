import React from 'react';
import Moment from 'react-moment';
import { withAuth } from '../../Context/AuthContext';

const BookingDescription = props => {
  const {
    // eslint-disable-next-line react/prop-types
    booking: { startingHour, club, court, day },
  } = props;
  return (
    <div>
      <div id="club-header-image">
        <img src={club.clubImages} alt="club-avatar"></img>
      </div>
      <h1 id="club-detail-header">{club.name}</h1>
      <div id="club-detail-location">
        <p>{club.location}</p>
        <img src="/../../images/map.svg" alt="map-icon"></img>
      </div>
      <div id="booking-card-details" key={club._id}>
        <div id="moment-booking" style={{ margin: '10px 0 0 0' }}>
          <Moment format="DD dddd MMMM">{day}</Moment>
          <p className="with-bottom-border">{court.courtName}</p>
        </div>
        <div id="reservation-hours">
          <p>
            <span>Start</span>
            <br />
            {startingHour}:00
          </p>
          <p>
            <span>End</span>
            <br />
            {startingHour + 1}:00
          </p>
          <p>
            <span>Duration</span>
            <br />
            60min
          </p>
        </div>
        <div id="profile-btn-div" style={{ margin: '0 0 20px 0' }}>
          <div id="profile-btn">
            <p>Court Price</p>
          </div>
          <div>
            <h2 style={{ color: '#017069' }}>{club.price}€</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(BookingDescription);
