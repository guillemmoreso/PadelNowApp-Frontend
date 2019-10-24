import React from 'react';
import { withAuth } from '../Context/AuthContext';

const ClubCard = props => {
  const {
    club: { name, description, city, price },
  } = props;
  return (
    <div>
      <p>Club</p>
      <label htmlFor="">Name</label>
      <p>{name}</p>
      <label htmlFor="">City</label>
      <p>{city}</p>
      <label htmlFor="">Description</label>
      <p>{description}</p>
      <label htmlFor="">Price</label>
      <p>{price}</p>
    </div>
  );
};

export default withAuth(ClubCard);
