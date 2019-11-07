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
        <h1 id="club-detail-header">Booking Info</h1>
        <div id="moment-booking">
          <Moment format="DD dddd MMMM">{day}</Moment>
        </div>
        <div id="booking-card-details">
          <p>
            {startingHour}:00 - {startingHour + 1}:00
          </p>
          <p>{startingHour}€</p>
          <p className="with-bottom-border">{court.courtName}</p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(BookingDescription);
