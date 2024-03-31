import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';
import "./Navbar.css"
function Navbar() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user ID from localStorage
    const userId = localStorage.getItem('token'); // Assuming user ID is stored with the key 'token'
  
    // Make a GET request to the backend endpoint to retrieve user data
    axios.get(`http://localhost:3000/users?userId=${userId}`)
      .then(response => {
        // Handle successful response
        console.log('User data:', response.data);
        setUserData(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching user data:', error);
      });
  }, []); // Run this effect only once on component mount

  console.log(userData,"this is userdata from backend")
  
  return (
   <div className='navbar'>
     <nav>
      <ul>
        <li>
          <Link to="/TrainList">home
          </Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/refund">Refund</Link>
        </li>
        <li>
          <Link to="/login">Login-In</Link>
        </li>
      </ul>
    </nav>
   </div>
  );
}

export default Navbar;
