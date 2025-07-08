import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Basic styling for the navbar
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#333',
    color: 'white',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 0.5rem',
  };

  const brandStyle = {
    ...linkStyle,
    fontWeight: 'bold',
    fontSize: '1.5rem',
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const buttonStyle = {
    background: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '0.3rem 0.7rem',
    marginLeft: '1rem',
    cursor: 'pointer',
  };

  if (loading && !isAuthenticated) { // Only show loading if not already authenticated (to avoid flicker on load)
    return (
      <nav style={navStyle}>
        <Link to="/" style={brandStyle}>Marketplace</Link>
        <div>Loading...</div>
      </nav>
    );
  }

  return (
    <nav style={navStyle}>
      <Link to="/" style={brandStyle}>Marketplace</Link>
      <div style={userInfoStyle}>
        {isAuthenticated && user ? (
          <>
            <span style={{ marginRight: '1rem' }}>Hi, {user.name || user.phoneNumber}!</span>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <button onClick={handleLogout} style={buttonStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
