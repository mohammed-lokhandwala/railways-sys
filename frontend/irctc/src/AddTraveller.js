import React, { useState } from 'react';
import './AddTraveller.css'; // Import CSS file for styling

function AddTraveller({ onAddTraveller }) {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate input
    if (!name || !age || !gender) {
      alert('Please fill out all fields');
      return;
    }
    // Add traveller
    onAddTraveller({ name, age, gender });
    // Clear input fields
    setName('');
    setAge('');
    setGender('');
    // Close the popup
    setShowPopup(false);
  };

  return (
    <div className="add-traveller-container">
      <button className="add-traveller-button" onClick={() => setShowPopup(true)}>
        Add Traveller
      </button>
      {/* Popup for adding traveller */}
      {showPopup && (
        <div className="add-traveller-popup">
          <h2>Add Traveller</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <button type="submit">Add User</button>
          </form>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default AddTraveller;
