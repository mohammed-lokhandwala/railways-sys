import React from 'react';
import './TravellerList.css'; // Import CSS file for styling

function TravellerList({ travellers }) {
  return (
    <div className="traveller-list-container">
      <h2>Travellers List</h2>
      <ul className="traveller-list">
        {travellers.map((traveller, index) => (
          <li key={index}>{traveller.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TravellerList;
