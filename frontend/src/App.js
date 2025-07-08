import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Assuming App.css has some basic layout styles

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // Placeholder for a protected page
import NotFoundPage from './pages/NotFoundPage'; // Placeholder for 404

// Components
import ProtectedRoute from './components/Routing/ProtectedRoute';
import Navbar from './components/Layout/Navbar';

// Placeholder for HomePage
const HomePage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Welcome to the Online Marketplace</h1>
    <p>This is a placeholder home page.</p>
  </div>
);


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container"> {/* Optional: for centering content */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          {/* Method 1: Wrapping component directly */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Method 2: Using ProtectedRoute as a layout for nested routes (if Outlet is used in ProtectedRoute) */}
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route> */}

          {/* Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// Note to user:
// 1. Install react-router-dom: `npm install react-router-dom` in the frontend directory.
// 2. The Navbar is very basic; a more dynamic one will be created in the next step.
// 3. CSS classes like "container" are placeholders; actual styling is needed.
