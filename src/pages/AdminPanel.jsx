import apiInstance from '../apiInstance';
import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: 0
  });
  const [productMsg, setProductMsg] = useState('');
  const [productError, setProductError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiInstance.get('/users');
        setUsers(res.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8 bg-dark rounded-xl shadow-glass border border-gray-800 text-light">
      <h1 className="text-3xl font-bold mb-6 text-accent">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-accent">Users</h2>
          {loading ? (
            <div className="text-gray-400">Loading users...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="w-full text-left border border-gray-700 rounded-xl">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 text-accent">Name</th>
                  <th className="p-2 text-accent">Email</th>
                  <th className="p-2 text-accent">Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-t border-gray-700">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className={`p-2 font-bold ${user.isAdmin ? 'text-accent' : 'text-gray-400'}`}>{user.isAdmin ? 'Admin' : 'User'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Add Product Section (Admin Only) */}
        {user && user.isAdmin && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-accent">Add Product</h2>
            <form
              onSubmit={async e => {
                e.preventDefault();
                setProductMsg('');
                setProductError('');
                try {
                  const token = localStorage.getItem('token');
                  const res = await apiInstance.post('/products', productForm, {
                    headers: { Authorization: `Bearer ${token}` }
                  });
                  setProductMsg('Product added successfully!');
                  setProductForm({ name: '', description: '', price: '', imageUrl: '', category: '', stock: 0 });
                } catch (err) {
                  setProductError(err.response?.data?.message || 'Failed to add product');
                }
              }}
              className="flex flex-col gap-3"
            >
              <input type="text" className="p-2 rounded bg-gray-800 border border-gray-700 text-white" placeholder="Name" value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} required />
              <textarea className="p-2 rounded bg-gray-800 border border-gray-700 text-white" placeholder="Description" value={productForm.description} onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))} required />
              <input type="number" className="p-2 rounded bg-gray-800 border border-gray-700 text-white" placeholder="Price" value={productForm.price} onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))} required min="0" step="0.01" />
              <input type="text" className="p-2 rounded bg-gray-800 border border-gray-700 text-white" placeholder="Image URL" value={productForm.imageUrl} onChange={e => setProductForm(f => ({ ...f, imageUrl: e.target.value }))} required />
              <input type="text" className="p-2 rounded bg-gray-800 border border-gray-700 text-white" placeholder="Category" value={productForm.category} onChange={e => setProductForm(f => ({ ...f, category: e.target.value }))} required />
              <input type="number" className="p-2 rounded bg-gray-800 border border-gray-700 text-white" placeholder="Stock" value={productForm.stock} onChange={e => setProductForm(f => ({ ...f, stock: e.target.value }))} required min="0" />
              <button type="submit" className="bg-accent text-dark font-bold py-2 rounded hover:bg-accent-dark transition">Add Product</button>
              {productMsg && <div className="text-green-400 font-semibold mt-2">{productMsg}</div>}
              {productError && <div className="text-red-400 font-semibold mt-2">{productError}</div>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
