// this file is the first layer of defense for faulty authorization 
// and also for the user to see the error in the ui

// ensures the user is authenticated before they can access a route
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  // get the current user and loading state from the auth context
  const { user, loading } = useAuth();

  // show a loading message while authentication status is still being checked
  if (loading) {
    return <div>loading...</div>; // or your custom loading component
  }

  // if there is no logged-in user, redirect to the sign-in screen
  if (!user) {
    return <Navigate to="/sign-in-screen" replace />;
  }

  // if allowed roles are specified and the user's role is not included, redirect to home page
  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/home-page" replace />;
  }

  // if the user is authenticated and has the correct role, render the protected content
  return children;
};