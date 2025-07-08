import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService'; // Assuming authService.js is in ../services

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Initialize token from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading true to check for existing session
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserFromToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken); // Ensure token state is set
        try {
          // No need to pass token to getCurrentUser, service handles it via interceptor
          const response = await authService.getCurrentUser();
          if (response.success) {
            setUser(response.data);
            setIsAuthenticated(true);
          } else {
            // This case might be handled by the error block if getCurrentUser throws
            authService.logoutUser(); // Clear invalid token
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (err) {
          console.error("Failed to load user from token:", err);
          authService.logoutUser(); // Clear invalid token
          setUser(null);
          setIsAuthenticated(false);
          // Optionally set an error message for the UI if needed
          // setError(err.message || 'Session expired. Please login again.');
        }
      }
      setLoading(false);
    };

    loadUserFromToken();
  }, []); // Empty dependency array means this runs once on mount

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.loginUser(credentials);
      if (response.success) {
        setUser(response.data);
        setToken(response.token); // authService already stored it in localStorage
        setIsAuthenticated(true);
        return true; // Indicate success
      } else {
        setError(response.message || 'Login failed');
        setIsAuthenticated(false);
        return false; // Indicate failure
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login.');
      setIsAuthenticated(false);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.registerUser(userData);
      if (response.success) {
        // Typically, after registration, you might want to log the user in
        // or redirect them to the login page. For now, let's assume direct login.
        setUser(response.data);
        setToken(response.token); // authService already stored it in localStorage
        setIsAuthenticated(true);
        return true; // Indicate success
      } else {
        setError(response.message || 'Registration failed');
        setIsAuthenticated(false);
        return false; // Indicate failure
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
      setIsAuthenticated(false);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logoutUser(); // Clears token from localStorage
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    // Optionally redirect to login page or home page via useNavigate() if called from a component
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    // loadUser: loadUserFromToken, // Not directly exposed, happens on mount
    clearError: () => setError(null) // Utility to clear errors
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* Or show a global loader: loading ? <GlobalLoader /> : children */}
    </AuthContext.Provider>
  );
};
