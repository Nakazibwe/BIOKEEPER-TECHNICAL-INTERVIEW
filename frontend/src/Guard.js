import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from './context';
import jwt_decode from 'jwt-decode';

const Guard = ({ children }) => {
  const { accessToken } = useContext(AppContext);
  const decoded = jwt_decode(accessToken);
  const currentDate = new Date().getTime() / 1000;
  if (accessToken === '' || currentDate >= decoded.exp || accessToken === undefined || accessToken === null) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default Guard;
