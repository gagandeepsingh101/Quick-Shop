import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-primary text-white p-4 sticky top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">QuickShop</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Products</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
            {token ? (
              <button onClick={logout} className="hover:underline">Logout</button>
            ) : (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}