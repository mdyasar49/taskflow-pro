import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from '../config';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem(AUTH_TOKEN_KEY);
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
