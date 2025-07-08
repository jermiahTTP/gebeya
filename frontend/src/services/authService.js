import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1/auth'; // Default to backend port

// Utility to get the token from localStorage (or context at a later stage)
const getToken = () => {
  return localStorage.getItem('token');
};

// Create an Axios instance for API calls
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token); // Store token on successful registration
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Registration failed');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token); // Store token on successful login
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/me');
    return response.data;
  } catch (error) {
    // If token is invalid or expired, backend will return 401.
    // This might be a good place to also clear the local token if that happens.
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    throw error.response ? error.response.data : new Error('Failed to fetch user');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  // No API call for logout in this simple JWT setup,
  // but if there were (e.g., to invalidate server-side session/token), it would be here.
};

// Note: The user will need to install axios: `npm install axios` in the frontend directory.
// Also, they might want to set REACT_APP_API_URL in a .env file in the frontend directory.
