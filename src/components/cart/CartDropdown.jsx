import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

const CartDropdown = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-gray-900 rounded-xl shadow-glass z-50 p-4 border border-gray-700">
      <div className="max-h-96 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-400 text-center py-4">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item._id} className="flex items-center gap-4 py-2 border-b border-gray-800">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl border border-gray-700"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-light">{item.name}</h3>
                  <p className="text-accent font-semibold">${item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="text-gray-400 hover:text-accent"
                    >
                      -
                    </button>
                    <span className="text-sm text-light">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="text-gray-400 hover:text-accent"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-gray-600 hover:text-accent"
                >
                  ×
                </button>
              </div>
            ))}
            <div className="mt-4 space-y-4">
              <div className="flex justify-between font-semibold text-light">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Button 
                  fullWidth 
                  onClick={() => {
                    navigate('/checkout');
                    onClose();
                  }}
                  className="bg-accent text-dark rounded-xl hover:bg-gray-300 font-semibold transition w-full"
                >
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={() => {
                    navigate('/cart');
                    onClose();
                  }}
                  className="border border-accent text-accent rounded-xl hover:bg-gray-800 w-full"
                >
                  View Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
