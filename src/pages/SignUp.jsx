import apiInstance from '../apiInstance';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Real API call to backend
    try {
      const res = await apiInstance.post('/auth/register', { name, email, password });
      const data = res.data;
      navigate('/signin');
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-glass w-full max-w-md border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-accent">Sign Up</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-accent">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-700 rounded-xl bg-gray-800 text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-accent">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-700 rounded-xl bg-gray-800 text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-accent">Confirm Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-700 rounded-xl bg-gray-800 text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-accent text-dark py-2 rounded-xl font-bold hover:bg-gray-300 transition mb-4">Sign Up</button>
        <div className="text-center text-gray-400">
          Already have an account? <Link to="/signin" className="text-accent font-bold hover:underline">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
