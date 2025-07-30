import apiInstance from '../apiInstance';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [toast, setToast] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiInstance.get('/products');
        const data = res.data;
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (minPrice === "" || p.price >= Number(minPrice)) &&
      (maxPrice === "" || p.price <= Number(maxPrice))
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      // Default to newest
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black mb-8 text-white tracking-tighter title-shadow text-center">
          ALL PRODUCTS
        </h1>
        
        {/* Filter and Sort Controls */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg mb-8 flex flex-col lg:flex-row lg:items-center gap-4">
          <input
            type="text"
            placeholder="Search for gear..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full lg:w-1/3 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-2/3">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="w-full sm:w-1/2 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            >
              <option value="newest">Sort by Newest</option>
              <option value="price-asc">Sort by Price: Low to High</option>
              <option value="price-desc">Sort by Price: High to Low</option>
            </select>
            <div className="flex gap-4 w-full sm:w-1/2">
              <input
                type="number"
                placeholder="Min $"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              <input
                type="number"
                placeholder="Max $"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center text-gray-400 py-16">Loading products...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-16">No products match your criteria.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <div
                key={product._id || product.id}
                className="bg-gray-900/50 border-2 border-gray-800 rounded-2xl shadow-lg hover:shadow-red-500/40 hover:border-red-700/60 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                <div
                  className="relative w-full cursor-pointer"
                  onClick={() => {
                    if (!user) navigate('/login');
                    else navigate(`/product/${product._id || product.id}`);
                  }}
                >
                  <img
                    src={product.image || product.imageUrl}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-white mb-2 truncate uppercase tracking-wider">
                    {product.name}
                  </h3>
                  <p className="text-red-500 font-bold text-2xl mb-4">${product.price}</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <button
                      className="w-full bg-red-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                      onClick={() => {
                        if (!user) navigate('/login');
                        else {
                          addToCart(product);
                          setToast(`${product.name} added to cart`);
                          setTimeout(() => setToast(''), 2000);
                        }
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg z-50 text-base font-bold animate-toast-in">
          {toast}
        </div>
      )}
       <style>{`
        .title-shadow { text-shadow: 0px 4px 12px rgba(0, 0, 0, 0.8); }
        @keyframes toast-in {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-toast-in { animation: toast-in 0.5s ease-out; }
      `}</style>
    </div>
  );
};
export default Shop;
