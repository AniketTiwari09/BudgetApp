import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Signup from './Signup/Signup';
import Dashboard from './Dashboard/dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
         {/* Add a Route for the Dashboard component */}
         <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;