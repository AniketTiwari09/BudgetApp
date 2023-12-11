import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username,
        password,
      });
  
      if (response.status === 200) {
        // Redirect to the homepage or login page after successful signup
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Signup failed. Please try again.'); 
    }
  };
  
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
        {error && <p>{error}</p>} {/* Display error message if signup fails */}
      </form>
    </div>
  );
};

export default Signup;
