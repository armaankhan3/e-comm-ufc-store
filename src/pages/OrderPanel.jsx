import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Expect order details to be passed via location.state from Checkout
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center text-gray-400 bg-dark rounded-xl shadow-glass mt-12 border border-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-accent">No order found.</h2>
        <button onClick={() => navigate('/shop')} className="bg-accent text-dark px-6 py-2 rounded-xl mt-4 font-bold">Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-dark rounded-xl shadow-glass mt-12 border border-gray-800">
      <h2 className="text-3xl font-extrabold mb-8 text-accent uppercase tracking-wide">Order Summary</h2>
      <div className="mb-8">
        <div className="text-lg text-gray-400 mb-2">Order ID: <span className="text-accent font-bold">{order.id || 'OCTAFIT-' + Math.floor(Math.random()*100000)}</span></div>
        <div className="text-lg text-gray-400 mb-2">Date: <span className="text-accent font-bold">{order.date || new Date().toLocaleString()}</span></div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-accent mb-4">Shipping Address</h3>
        <div className="text-gray-300">{order.address?.name}</div>
        <div className="text-gray-300">{order.address?.street}</div>
        <div className="text-gray-300">{order.address?.city}, {order.address?.state} {order.address?.zip}</div>
        <div className="text-gray-300">{order.address?.country}</div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-accent mb-4">Products</h3>
        <ul className="divide-y divide-gray-800">
          {order.items?.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-xl bg-gray-800 border border-gray-700" />
              <div className="flex-1">
                <div className="font-bold text-accent text-lg">{item.name}</div>
                <div className="text-accent font-semibold">${item.price}</div>
                <div className="text-gray-400">Qty: {item.quantity}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-2xl font-bold text-accent mb-4">Total: <span className="text-red-500">${order.total?.toFixed(2)}</span></div>
      <button onClick={() => navigate('/shop')} className="w-full bg-accent text-dark py-4 rounded font-extrabold text-lg hover:bg-gray-300 transition uppercase tracking-wide mt-4">Continue Shopping</button>
    </div>
  );
};

export default OrderPanel;
