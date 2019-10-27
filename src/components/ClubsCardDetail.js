import React from 'react';
import { withAuth } from '../Context/AuthContext';

const ClubsCardDetail = props => {
  const {
    club: { name, description, city, price, openingHours },
  } = props;
  return (
    <div>
      <label htmlFor="">Name</label>
      <p>{name}</p>
      <label htmlFor="">City</label>
      <p>{city}</p>
      <label htmlFor="">Description</label>
      <p>{description}</p>
      <label htmlFor="">Price</label>
      <p>{price}</p>
      <label htmlFor="">Hours</label>
      <ul>
        {openingHours.map(hour => {
          return <li>{hour}</li>;
        })}
      </ul>
    </div>
  );
};

export default withAuth(ClubsCardDetail);
