import apiInstance from '../apiInstance';
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const res = await apiInstance.post('/auth/login', { email, password });
      const data = res.data;
      // Save user/token in AuthContext
      signIn(email, password, data.user, data.token);
      // After login, perform intended action or redirect
      if (location.state) {
        if (location.state.addToCart) {
          window.dispatchEvent(new CustomEvent('addToCartAfterLogin', { detail: location.state.addToCart }));
        }
        if (location.state.buyNow) {
          navigate(location.state.redirectTo, { state: { buyNow: true, items: location.state.items } });
        } else if (location.state.redirectTo) {
          navigate(location.state.redirectTo);
        } else {
          navigate('/');
        }
      } else {
        const redirectTo = location.state?.from?.pathname || '/';
        navigate(redirectTo);
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-glass w-full max-w-md border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-accent">Sign In</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-accent">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-700 rounded-xl bg-gray-800 text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-accent">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-700 rounded-xl bg-gray-800 text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-accent text-dark py-2 rounded-xl font-bold hover:bg-gray-300 transition mb-4">Sign In</button>
        <div className="text-center text-gray-400">
          Don't have an account? <Link to="/signup" className="text-accent font-bold hover:underline">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
