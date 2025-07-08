import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom'; // User needs to install react-router-dom

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You might want to show a global loading spinner here
    // or a more sophisticated loading state for the route.
    return <div>Loading session...</div>;
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If `children` prop is provided, render it (for wrapper-style protected routes like <ProtectedRoute><MyPage /></ProtectedRoute>)
  // If not, render <Outlet /> (for element-style in route config like <Route element={<ProtectedRoute />}><Route path="dashboard" element={<Dashboard />} /></Route>)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;

// Note to user:
// 1. Install react-router-dom: `npm install react-router-dom` in the frontend directory.
// 2. This component can be used in your routing setup in App.js. Example for React Router v6:
//    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
//    Or, for nested routes:
//    <Route element={<ProtectedRoute />}>
//      <Route path="/profile" element={<ProfilePage />} />
//      <Route path="/settings" element={<SettingsPage />} />
//    </Route>
