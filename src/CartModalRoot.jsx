import React from 'react';
import Cart from './pages/Cart';
import { useCart } from './context/CartContext';

const CartModalRoot = () => {
  const { isCartOpen } = useCart();
  return isCartOpen ? <Cart /> : null;
};

export default CartModalRoot;
