
import React from 'react';
import ReactDOM from 'react-dom';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, setCartOpen } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 p-4">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white mb-4 title-shadow">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return ReactDOM.createPortal(
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 font-sans fixed inset-0 z-[9999] overflow-auto">
      <div className="max-w-4xl mx-auto relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 shadow-lg hover:bg-red-600 transition z-50"
          onClick={() => setCartOpen(false)}
          aria-label="Close Cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-4xl sm:text-5xl font-black mb-8 text-white tracking-tighter title-shadow text-center">
          SHOPPING CART
        </h1>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
          <ul className="divide-y divide-gray-800">
            {cart.map((item) => (
              <li key={item._id || item.id} className="flex flex-col sm:flex-row items-center gap-4 py-6">
                <img
                  src={item.image || item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-gray-700"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg text-white">{item.name}</h3>
                  <p className="text-red-500 font-semibold text-xl">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3 bg-gray-800 rounded-full p-1 border border-gray-700">
                  <button onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} className="w-8 h-8 font-bold text-lg text-white rounded-full hover:bg-gray-700 transition">-</button>
                  <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)} className="w-8 h-8 font-bold text-lg text-white rounded-full hover:bg-gray-700 transition">+</button>
                </div>
                <p className="font-bold text-white text-xl w-24 text-center sm:text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button onClick={() => removeFromCart(item._id || item.id)} className="text-gray-500 hover:text-red-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-400">Subtotal</p>
              <p className="font-bold text-white text-xl">${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">Shipping</p>
              <p className="font-bold text-white text-xl">FREE</p>
            </div>
            <div className="flex justify-between items-center text-2xl font-black mb-8">
              <p className="text-white uppercase">Total</p>
              <p className="text-red-500">${total.toFixed(2)}</p>
            </div>
            <button
              className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
            <button onClick={clearCart} className="w-full text-center text-sm text-gray-500 hover:text-white mt-4 transition">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Cart;
