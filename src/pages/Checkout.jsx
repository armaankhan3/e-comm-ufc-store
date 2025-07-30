import apiInstance from '../apiInstance';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const location = useLocation();
  const [form, setForm] = useState({ name: '', address: '', email: '', card: '', expiry: '', cvc: '', upi: '', paymentMethod: 'Card' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Demo products for empty cart (for demo/testing)
  const demoProducts = [
    {
      _id: 'demo1',
      name: 'UFC Fight Gloves',
      price: 49.99,
      image: 'https://images.footballfanatics.com/ufc-merchandise/mens-ufc-black-official-pro-fight-gloves_ss5_p-200966595+u-vwzielguzpbqpzqg9cfk+v-4wspmw5mkeleozvp2b3v.jpg?_hv=2&w=400',
      quantity: 1,
    },
    {
      _id: 'demo2',
      name: 'UFC Walkout Hoodie',
      price: 79.99,
      image: 'https://images.footballfanatics.com/ufc-merchandise/mens-black-ufc-old-vegas-pullover-hoodie_ss5_p-202920566+u-fdwhhdklthqgup0i6ozz+v-5oj4fcuaklmjpdqe4jcd.jpg?_hv=2&w=400',
      quantity: 1,
    },
  ];

  const buyNowItems = location.state?.buyNow ? location.state.items : null;
  let checkoutItems = buyNowItems || cart;
  // If cart is empty and not a buy now, show demo products for demo/testing
  if (!buyNowItems && (!checkoutItems || checkoutItems.length === 0)) {
    checkoutItems = demoProducts;
  }
  const total = checkoutItems?.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0) || 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (e) => {
    setForm(f => ({ ...f, paymentMethod: e.target.value, card: '', expiry: '', cvc: '', upi: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields based on payment method
    if (!form.name || !form.address || !form.email) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.paymentMethod === 'Card' && (!form.card || !form.expiry || !form.cvc)) {
      setError('Please fill in all card details.');
      return;
    }
    if (form.paymentMethod === 'UPI' && !form.upi) {
      setError('Please enter your UPI ID.');
      return;
    }
    setError('');

    try {
      const token = localStorage.getItem('token');
      const orderPayload = {
        items: checkoutItems.map(i => ({ product: i._id, quantity: i.quantity || 1 })),
        shippingAddress: {
          street: form.address,
          city: 'TBD',
          state: 'TBD',
          zipCode: 'TBD',
          country: 'TBD'
        },
        paymentMethod: form.paymentMethod,
        totalPrice: total
      };
      const res = await apiInstance.post('/orders', orderPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      clearCart();
      navigate('/profile'); // Redirect to profile/orders page
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // ...existing code...

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black mb-8 text-white tracking-tighter title-shadow text-center">
          CHECKOUT
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            <div className="space-y-4">
              {checkoutItems.map(item => (
                <div key={item._id || item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={item.image || item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg border-2 border-gray-700" />
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-white">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 space-y-2">
              <div className="flex justify-between text-lg">
                <p className="text-gray-300">Subtotal</p>
                <p className="font-semibold text-white">${total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-lg">
                <p className="text-gray-300">Shipping</p>
                <p className="font-semibold text-white">FREE</p>
              </div>
              <div className="flex justify-between text-2xl font-bold mt-4">
                <p className="text-white">Total</p>
                <p className="text-red-500">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Shipping & Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition" />
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition" />
              <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Shipping Address" className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition" />

              {/* Payment Method Selection */}
              <div className="pt-2">
                <label className="block text-white font-semibold mb-2">Payment Method</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="paymentMethod" value="Card" checked={form.paymentMethod === 'Card'} onChange={handlePaymentMethodChange} className="accent-red-600" /> Card
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="paymentMethod" value="UPI" checked={form.paymentMethod === 'UPI'} onChange={handlePaymentMethodChange} className="accent-red-600" /> UPI
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="paymentMethod" value="COD" checked={form.paymentMethod === 'COD'} onChange={handlePaymentMethodChange} className="accent-red-600" /> Cash on Delivery
                  </label>
                </div>
              </div>

              {/* Card Fields */}
              {form.paymentMethod === 'Card' && (
                <div className="border-t border-gray-700 pt-4">
                  <input type="text" name="card" value={form.card} onChange={handleChange} placeholder="Card Number" className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition" />
                  <div className="flex gap-4 mt-4">
                    <input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" className="w-1/2 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition" />
                    <input type="text" name="cvc" value={form.cvc} onChange={handleChange} placeholder="CVC" className="w-1/2 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition" />
                  </div>
                </div>
              )}

              {/* UPI Field */}
              {form.paymentMethod === 'UPI' && (
                <div className="border-t border-gray-700 pt-4">
                  <input type="text" name="upi" value={form.upi} onChange={handleChange} placeholder="Enter your UPI ID" className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition" />
                </div>
              )}

              {/* No extra fields for COD */}

              {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
              <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider">
                Place Order Securely
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
