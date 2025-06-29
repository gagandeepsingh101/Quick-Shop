import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const [adding, setAdding] = useState(false);
  const token = localStorage.getItem('token');

  const handleAddToCart = async () => {
    if (!token) {
      toast.error('Please log in to add items to cart', {
        style: { background: '#fee2e2', color: '#b91c1c' },
      });
      return;
    }

    setAdding(true);
    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        {
          title: product.title,
          price: product.price,
          imageURL: product.image,
          description: product.description,
          quantity: 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Added ${product.title} to cart`, {
        style: { background: '#dcfce7', color: '#15803d' },
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Failed to add to cart', {
        style: { background: '#fee2e2', color: '#b91c1c' },
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain rounded-lg mb-4"
        onError={e => (e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found')}
      />
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {product.title}
      </h3>
      <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500 mb-4 line-clamp-3">{product.description}</p>
      <button
        onClick={handleAddToCart}
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-transform hover:scale-105"
        disabled={adding}
        aria-label={`Add ${product.title} to cart`}
      >
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}