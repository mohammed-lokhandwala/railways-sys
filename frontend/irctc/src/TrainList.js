import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TrainList.css';
import Navbar from './Navbar';
import Footer from './Footer'

function TrainList() {
  const [trains, setTrains] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTrains, setFilteredTrains] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/trains')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error('Error fetching trains:', error);
      });
  }, []);

  useEffect(() => {
    // Filter trains based on the search query
    const filtered = trains.filter(train =>
      train.trainName.toLowerCase().includes(searchQuery.toLowerCase()) || train.from.toLowerCase().includes(searchQuery.toLowerCase()) || train.where.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTrains(filtered);
  }, [searchQuery, trains]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='boss'>
      <Navbar />
     
      <input className='search-bar'
        type="text"
        placeholder="Search trains by name..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul className="train-list">
        {filteredTrains.map(train => (
          <Link to={`/train/${train._id}`} key={train._id} className="train-item-link">
            <li className="train-item">

       
          <div className='t'><strong>{train.trainName}</strong> </div>
              <div className='aa'><strong> {train.from}</strong> {train.arrival}</div>
               <div className='TO'><strong>TO</strong></div>
              <div className='dd'><strong> {train.where} </strong> {train.departure}</div>

              <div className='ticket'>
              <div className='ticket-info'>
              <h2>SE</h2>
              <p>₹{train.ticketPrice}</p>
              </div>
              <p className="cancellation-info">Cancellation AVAILABLE</p >
              </div>
            </li>
         

          </Link>
        ))}
         
        
      </ul>


      <Footer />
     
    </div>
  );
}

export default TrainList;
