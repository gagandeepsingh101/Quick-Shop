import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/login`, { email, password });
    toast.success('Login successful');
    return res.data;
  } catch (err) {
    console.error('Login error:', err);
    toast.error('Login failed. Check your credentials.');
    throw err;
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/register`, { name, email, password });
    toast.success('Registration successful');
    return res.data;
  } catch (err) {
    console.error('Registration error:', err);
    toast.error('Registration failed. Try again.');
    throw err;
  }
};

export const getLoggedInUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const res = await axios.get(`${BASE_URL}/api`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.user;
  } catch (err) {
    console.error('Get logged-in user error:', err);
    toast.error('Failed to fetch user info');
    throw err;
  }
};
