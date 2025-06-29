import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const createPaymentIntent = async (email) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/payment/create-payment-intent`, { email }, authHeader());
    toast.success('Payment initiated');
    return res.data;
  } catch (err) {
    console.error('Payment intent error:', err);
    toast.error('Failed to start payment');
    throw err;
  }
};
