// this file provides a centralized and consistent authentication state
// accross the entire React app. it basically tells the components if 'the user is logged in' and 'what is their role' 
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

// create a context to share auth info with the whole app
const AuthContext = createContext();

// this component wraps your app and provides the auth logic
export const AuthProvider = ({ children }) => {
  // stores the logged-in user's data (null if not logged in)
  const [user, setUser] = useState(null);
  // shows if we're still checking the login status
  const [loading, setLoading] = useState(true);

  // logout: removes token and clears user
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  // check if the user is logged in by using the saved token
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // no token means no user is logged in
        setLoading(false);
        return;
      }
      // check if the token is still valid by calling the backend
      const response = await fetch('http://localhost:3000/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        // if valid, set the user
        const userData = await response.json();
        setUser(userData);
      } else {
        // if invalid token, force logout
        logout();
      }
    } catch (error) {
      // on error, also logout
      logout();
    } finally {
      // done checking
      setLoading(false);
    }
  }, [logout]);

  // run checkAuth() when the app first loads
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // login function to call when the user submits login form
  const login = useCallback(async (email, password) => {
    try {
      console.log('Attempting login with:', email);
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (!response.ok) {
        // show better error message if login fails
        const error = new Error(data.error || 'Login failed');
        error.details = data.message || 'Unknown error occurred';
        error.status = response.status;
        throw error;
      }

      if (!data.token || !data.user) {
        throw new Error('Invalid response from server');
      }

      console.log('Login successful, storing token');
      // save token and set user
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data.user;

    } catch (error) {
      console.error('Login error:', {
        message: error.message,
        details: error.details,
        status: error.status
      });
      
      // throw a simple error message the ui can show
      const userError = new Error(error.details || error.message || 'Login failed');
      userError.originalError = error;
      throw userError;
    }
  }, []);

  // signup function to register a new user
  const signup = useCallback(async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Signup failed');
      
      // save token and user on success
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  }, []);

  // value to share with components using the context
  const value = useMemo(() => ({
    user, loading, login, signup, logout
  }), [user, loading, login, signup, logout]);

  // render the context provider with the value
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook to use auth context easily in components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};