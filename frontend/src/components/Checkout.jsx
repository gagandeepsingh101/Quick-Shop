import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { emptyCart } from '../api/cart';
import { createPaymentIntent } from '../api/payment';
import { getLoggedInUser } from '../api/auth';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { total } = useLocation().state;

  // Fetch user's email on mount
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const user = await getLoggedInUser();
        setEmail(user.email || '');
      } catch (err) {
        console.error('Failed to fetch user:', err);
        toast.error('Failed to load user info');
      }
    };
    fetchEmail();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!email) return toast.error('Please enter your email');

    setLoading(true);
    try {
      const { clientSecret, items, total, paymentId } = await createPaymentIntent(email);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email },
        },
      });

      if (result.error) {
        setError(result.error.message);
        toast.error('Payment failed');
        return;
      }

      await emptyCart();
      toast.success('Payment successful!');
      navigate('/success', { state: { total, items, paymentId } });
    } catch (err) {
      console.error(err);
      setError('Payment failed. Please try again.');
      toast.error('Something went wrong with the payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="mb-4">
        <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Card Details</label>
        <CardElement className="border rounded p-2" />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-2 rounded hover:bg-indigo-700 flex items-center justify-center disabled:opacity-50"
        disabled={!stripe || loading}
      >
        {loading && (
          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
          </svg>
        )}
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}

function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}

export default CheckoutWrapper;
