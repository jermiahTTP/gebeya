import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // User needs to install react-router-dom

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading, error: authError, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine where to redirect after login
  // If user was redirected to login from a protected page, `location.state.from` will have that path
  const from = location.state?.from?.pathname || '/dashboard'; // Default to dashboard

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError(); // Clear previous auth errors

    const success = await login({ phoneNumber, password });
    if (success) {
      navigate(from, { replace: true }); // Redirect to original destination or dashboard
    } else {
      // Auth error is already set in AuthContext, it will be displayed
    }
  };

  // Basic styling (inline for brevity, ideally use CSS classes)
  const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' },
    form: { display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' },
    input: { padding: '8px', fontSize: '16px' },
    button: { padding: '10px', fontSize: '16px', cursor: 'pointer' },
    error: { color: 'red', marginTop: '10px' },
    link: { marginTop: '15px'}
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {authError && <p style={styles.error}>{authError}</p>}
      <p style={styles.link}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;

// Note to user:
// 1. Install react-router-dom: `npm install react-router-dom` in the frontend directory.
// 2. Ensure this page is added to your routing setup in App.js or your routing file.
// 3. Styling is very basic; create proper CSS for a better look.
