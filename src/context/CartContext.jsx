import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import apiInstance from '../apiInstance';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return;
    const token = user.token || localStorage.getItem('token');
    try {
      const res = await apiInstance.get('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setCart(data.map(item => ({...item.product, quantity: item.quantity, id: item.product._id})));
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
    // Listen for addToCartAfterLogin event
    const handleAddToCartAfterLogin = (e) => {
      addToCart(e.detail);
    };
    window.addEventListener('addToCartAfterLogin', handleAddToCartAfterLogin);
    return () => {
      window.removeEventListener('addToCartAfterLogin', handleAddToCartAfterLogin);
    };
  }, [user]);

  const addToCart = async (product) => {
    if (!user) return; // Or handle guest cart
    const token = user.token || localStorage.getItem('token');
    try {
      const res = await apiInstance.post('/cart', { productId: product._id, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setCart(data.map(item => ({...item.product, quantity: item.quantity, id: item.product._id})));
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (id) => {
    if (!user) return;
    const token = user.token || localStorage.getItem('token');
    try {
      const res = await apiInstance.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setCart(data.map(item => ({...item.product, quantity: item.quantity, id: item.product._id})));
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (!user || quantity < 1) return;
    const token = user.token || localStorage.getItem('token');
    try {
      const res = await apiInstance.put(`/cart/${id}`, { quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setCart(data.map(item => ({...item.product, quantity: item.quantity, id: item.product._id})));
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const clearCart = async () => {
    // This would require a new backend endpoint to clear the entire cart for a user
    // For now, we'll just remove items one by one.
    if (!user) return;
    try {
        for (const item of cart) {
            await removeFromCart(item.id);
        }
    } catch (error) {
        console.error('Failed to clear cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartContext };
