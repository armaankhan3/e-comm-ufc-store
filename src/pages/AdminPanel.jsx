import apiInstance from '../apiInstance';
import React, { useState, useEffect } from "react";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        {/* ...existing activity section... */}
      </div>
    </div>
  );
};

export default AdminPanel;
