import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Import the CSS file

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signup', formData);
      console.log('Signup successful:', response.data._id);

      // Store token and user data in local storage
      localStorage.setItem('token', response.data._id);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
            // Redirect to '/trainlist' after successful signup
      navigate('/trainlist');
    } catch (error) {
      console.error('Error signing up:', error);
    }

  };

  return (
    <div className="signup-container"> {/* Add class to container */}
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}> {/* Add class to form */}
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
