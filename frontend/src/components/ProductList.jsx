import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error('Error fetching products:', err);
        toast.error('Failed to load products', {
          style: { background: '#fee2e2', color: '#b91c1c' },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
          Products
        </h1>
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center mb-6">
            <svg
              className="animate-spin h-8 w-8 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              />
            </svg>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing {products.length} products
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
