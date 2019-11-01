import React from 'react';
import { withAuth } from '../Context/AuthContext';

const BookingDescription = props => {
  const {
    club: { name, location, price, openingHours, courts },
  } = props;
  return (
    <div>
      <h1 id="club-detail-header">{name}</h1>
      <p>Court: {courts[0].courtName}</p>
      <p>Court Price: {price}€</p>
    </div>
  );
};

export default withAuth(BookingDescription);
