import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../Login/title.jpg';

const Homepage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://138.197.95.176:3000/login', {
        username,
        password,
      });

      if (response.status === 200 && response.data.message === 'Login successful') {
        // Redirect to the dashboard upon successful login
        window.location.href = '/dashboard'; // Change this to the route you want to redirect to
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h2>Please log in to access the Homepage</h2>
      <img src={logoImage} alt="Logo" />
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
  );
};

export default Homepage;
