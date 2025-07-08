import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.name || user.phoneNumber}!</p>
          <p>Your Role: {user.role}</p>
          <button onClick={logout} style={{ padding: '10px', marginTop: '20px' }}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default DashboardPage;
