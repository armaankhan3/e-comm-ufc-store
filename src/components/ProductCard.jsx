import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 rounded-xl shadow-glass overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
      <Link to={`/product/${product._id}`}>
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 rounded-t-xl border-b border-gray-700"
        />
      </Link>
      <div className="p-4">
        <Link 
          to={`/product/${product._id}`}
          className="text-lg font-semibold text-accent hover:text-gray-300 transition-colors"
        >
          {product.name}
        </Link>
        <p className="text-gray-400 text-sm mt-1">{product.description.substring(0, 100)}...</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-accent font-bold">${product.price}</span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-gray-400">{product.averageRating || 0}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="bg-accent text-dark px-4 py-2 rounded-xl hover:bg-gray-300 transition font-bold"
            onClick={() => {
              if (!user) {
                navigate('/login');
              } else {
                addToCart(product);
              }
            }}
          >
            Add to Cart
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition font-bold"
            onClick={() => {
              if (!user) {
                navigate('/login');
              } else {
                navigate('/checkout', { state: { buyNow: true, items: [{ ...product, quantity: 1 }] } });
              }
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
