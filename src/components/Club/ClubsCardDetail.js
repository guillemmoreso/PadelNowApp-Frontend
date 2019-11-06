import React from 'react';
import { withAuth } from '../../Context/AuthContext';

const ClubsCardDetail = props => {
  const {
    club: { name, location, price, openingHours, clubImages, _id },
    userClubs,
  } = props;
  return (
    <div>
      <div id="club-header-image">
        <img src={clubImages[0]} alt="club-avatar"></img>
      </div>
      <h1 id="club-detail-header">{name}</h1>
      {userClubs.includes(_id) ? (
        <span
          className="heart"
          onClick={() => {
            this.saveSpot(_id);
          }}
        >
          <img src="/images/heart-circle-full.svg" alt="Spot saved" />
        </span>
      ) : (
        <span
          className="heart"
          onClick={() => {
            this.saveSpot(_id);
          }}
        >
          <img src="/images/heart-circle-empty.svg" alt="Spot saved" />
        </span>
      )}

      <p>{location}</p>
      <p>Court Price: {price}€</p>
      <p>Opening hours: </p>
      {openingHours.map(hour => {
        return <p>{hour}</p>;
      })}
    </div>
  );
};

export default withAuth(ClubsCardDetail);
