import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const getCart = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/cart`, authHeader());
    return res.data;
  } catch (err) {
    console.error('Failed to fetch cart:', err);
    toast.error('Failed to load cart');
    throw err;
  }
};

export const updateCartItem = async (productId, quantity, title = '') => {
  try {
    await axios.put(`${BASE_URL}/api/cart/update`, { productId, quantity }, authHeader());
    toast.success(`Updated quantity for ${title}`);
  } catch (err) {
    console.error('Error updating cart:', err);
    toast.error('Failed to update cart item');
    throw err;
  }
};

export const removeCartItem = async (id, title = '') => {
  try {
    await axios.delete(`${BASE_URL}/api/cart/remove/${id}`, authHeader());
    toast.success(`Removed ${title} from cart`);
  } catch (err) {
    console.error('Error removing item:', err);
    toast.error('Failed to remove item');
    throw err;
  }
};

export const emptyCart = async () => {
  try {
    await axios.delete(`${BASE_URL}/api/cart/remove/all`, authHeader());
    toast.success('Cart cleared');
  } catch (err) {
    console.error('Error clearing cart:', err);
    toast.error('Failed to clear cart');
    throw err;
  }
};

export const addToCart = async (item) => {
  try {
    await axios.post(`${BASE_URL}/api/cart/add`, item, authHeader());
    toast.success(`Added ${item.title} to cart`);
  } catch (err) {
    console.error('Error adding to cart:', err);
    toast.error('Failed to add item to cart');
    throw err;
  }
};
