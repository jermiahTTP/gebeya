import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // User needs to install react-router-dom

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pageError, setPageError] = useState(''); // For form-level errors like password mismatch

  const { register, loading, error: authError, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError(); // Clear previous auth errors
    setPageError(''); // Clear previous page errors

    if (password !== confirmPassword) {
      setPageError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setPageError('Password must be at least 6 characters long.');
      return;
    }
    // Phone number format validation can be added here if desired,
    // though backend also validates it.

    const success = await register({ name, phoneNumber, password });
    if (success) {
      // Navigate to login page or a dashboard/home page
      // For now, let's navigate to login, assuming user needs to login after registration.
      // Or, if register logs them in directly (as current AuthContext does):
      navigate('/dashboard'); // Or some protected route
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Name (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="tel" // Use "tel" for phone numbers
          placeholder="Phone Number (e.g., 0912345678)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {pageError && <p style={styles.error}>{pageError}</p>}
      {authError && <p style={styles.error}>{authError}</p>}
      <p style={styles.link}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;

// Note to user:
// 1. Install react-router-dom: `npm install react-router-dom` in the frontend directory.
// 2. Ensure this page is added to your routing setup in App.js or your routing file.
// 3. Styling is very basic; create proper CSS for a better look.
