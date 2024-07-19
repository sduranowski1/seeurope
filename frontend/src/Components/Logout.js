// Logout.js
import React, { useContext, useEffect } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import AuthContext from '../AuthContext'; // Ensure the context is imported

const Logout = () => {
    const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage and context
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
    }, [navigate]);

  // Redirect to the login page
  return <Navigate to="/login" replace />;
};

export default Logout;
