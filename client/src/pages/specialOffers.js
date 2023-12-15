// SpecialOffers.js
import React from 'react';

const SpecialOffers = ({ offers }) => {
  return (
    <div>
      <h2>Special Offers</h2>
      <div className="offer-list">
        {offers.map(offer => (
          <div key={offer.id} className="offer-card">
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
