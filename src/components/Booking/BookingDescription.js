import React from 'react';
import { withAuth } from '../../Context/AuthContext';
import Moment from 'react-moment';

const BookingDescription = props => {
  const {
    // eslint-disable-next-line react/prop-types
    booking: { startingHour, club, court, day },
  } = props;
  return (
    <div>
      <h1>{club.name}</h1>
      <p>{court.courtName}</p>
      <p>
        Game: {startingHour} - {startingHour + 1}
      </p>
      <Moment format=" dddd DD/MM">{day}</Moment>
      <p>Court Price: {startingHour}€</p>
    </div>
  );
};

export default withAuth(BookingDescription);
