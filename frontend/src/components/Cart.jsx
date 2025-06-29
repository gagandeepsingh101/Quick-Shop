import { MinusIcon, PlusIcon, TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { emptyCart, getCart, removeCartItem, updateCartItem } from '../api/cart';

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data);
      setError('');
    } catch {
      setError('Failed to load cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [navigate, token]);

  const updateQuantity = async (id, quantity, title) => {
    if (quantity < 0) return;
    setLoading(true);
    try {
      await updateCartItem(id, quantity, title);
      await fetchCart();
    } catch {
      setError('Failed to update quantity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id, title) => {
    toast((t) => (
      <span>
        Remove <b>{title}</b> from cart?
        <div className="mt-2 flex gap-2 justify-end">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              setLoading(true);
              try {
                await removeCartItem(id, title);
                await fetchCart();
                toast.success(`Removed ${title} from cart`);
              } catch {
                setError('Failed to remove item. Please try again.');
                toast.error('Remove failed');
              } finally {
                setLoading(false);
              }
            }}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-sm bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </span>
    ));
  };

  const clearCart = async () => {
    toast((t) => (
      <span>
        Clear entire cart?
        <div className="mt-2 flex gap-2 justify-end">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              setLoading(true);
              try {
                await emptyCart();
                await fetchCart();
                toast.success('Cart cleared');
              } catch {
                setError('Failed to clear cart. Please try again.');
                toast.error('Clear failed');
              } finally {
                setLoading(false);
              }
            }}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-sm bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </span>
    ));
  };

  const total = Math.ceil(cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)) || 0;
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
          Your Shopping Cart
        </h1>
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
            <XCircleIcon className="w-6 h-6 mr-2" />
            {error}
          </div>
        )}
        {loading && (
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
        )}
        {cart.items.length === 0 ? (
          <>
            <p className="text-gray-600 text-center text-lg">Your cart is empty.</p>
            <p className="text-gray-600 text-center text-lg">Add items to your cart to continue shopping.</p>
            <Link to="/" className="block text-center text-primary hover:underline mt-4">Navigate to Products</Link>
          </>
        ) : (
          <>
            <div className="space-y-6">
              {cart.items.map(item => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  role="listitem"
                >
                  <img
                    src={item.imageURL}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg sm:mr-6 mb-4 sm:mb-0"
                    onError={e => (e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found')}
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                    <p className="text-gray-600 mt-1">
                      ${item.price.toFixed(2)} x {item.quantity} ={' '}
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex items-center mt-4 space-x-3">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1, item.title)}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 transition-transform hover:scale-105"
                        disabled={item.quantity <= 1 || loading}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        <MinusIcon className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="text-gray-700 font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1, item.title)}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 transition-transform hover:scale-105"
                        disabled={loading}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        <PlusIcon className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => removeItem(item._id, item.title)}
                        className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 transition-transform hover:scale-105"
                        disabled={loading}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cart Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 font-medium flex items-center disabled:opacity-50"
                  disabled={loading}
                  aria-label="Clear entire cart"
                >
                  <TrashIcon className="w-5 h-5 mr-1" />
                  Clear Cart
                </button>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                Total: ${total.toFixed(2)}
              </p>
              <button
                onClick={() => navigate('/checkout', { state: { total, items: cart.items } })}
                className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-transform hover:scale-105"
                disabled={cart.items.length === 0 || loading}
                aria-label="Proceed to checkout"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}