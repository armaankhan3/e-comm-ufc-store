

import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import apiInstance from '../apiInstance';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiInstance.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-400 font-bold bg-dark rounded-xl mt-8">Loading product...</div>;
  }
  if (!product || product.message) {
    return <div className="p-8 text-center text-gray-400 font-bold bg-dark rounded-xl mt-8">Product not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 flex flex-col md:flex-row gap-8 bg-dark rounded-xl shadow-glass mt-8 border border-gray-800">
      <img src={product.image || product.imageUrl} alt={product.name} className="w-64 h-64 object-contain rounded-xl bg-gray-800 border border-gray-700" />
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-2 text-accent">{product.name}</h1>
        <p className="text-lg text-gray-400 mb-4">{product.description}</p>
        <div className="text-2xl font-bold text-accent mb-6">${product.price}</div>
        <div className="flex gap-4">
          <button
            className="bg-accent text-dark px-6 py-2 rounded-xl hover:bg-gray-300 transition w-fit font-bold"
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
            className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition w-fit font-bold"
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

export default ProductDetails;
