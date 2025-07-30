


import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import apiInstance from '../apiInstance';
import gsap from 'gsap';
import { FaTshirt, FaUserNinja, FaHatCowboy, FaHandRock, FaShoppingBag, FaBoxOpen } from 'react-icons/fa';


const Home = () => {
  const categoriesRef = useRef([]);
  const carouselRef = useRef(null);
  const bannerRef = useRef(null);
  // Hero slider state
  // To add or change hero slider images, update this array:
  const heroImages = [
    "https://static.wixstatic.com/media/2e887f_297d80850da84e4e8ec33c20f9c412bc~mv2.png/v1/fill/w_480,h_640,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2e887f_297d80850da84e4e8ec33c20f9c412bc~mv2.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPtIeQHKxK6lWzg1xoRnUWjyp3oMY5wSsihAThVg79-ssRuBElWNuwW_hUnOvq8d_P8M&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPlUTorXrjlYiIk-B20TSUGh7GCZqPWm0P-4cNy_oN02qafeJ-4pJ6wPV40bfE3I7U5GM&usqp=CAU",
    "https://s.alicdn.com/@sc04/kf/A9e1ee0ae9d6341b19f26e25c0843f20bS/Mma-Rash-Guard-Sport-Suit-GYM-Men-Compression-Long-Sleeve-T-Shirt-Pants-Tight-Set-Jogging-Sportswear-Running-Set-BJJ-UFC-Clothes.jpg_300x300.jpg",
  ];
  const [heroIndex, setHeroIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [toast, setToast] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch products from backend
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

  useEffect(() => {
    if (categoriesRef.current.length) {
      gsap.fromTo(
        categoriesRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power3.out' }
      );
    }
    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 4, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  // Hero image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(i => (i + 1) % heroImages.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 font-sans">
      {/* Hero Section - Image Slider */}
      <section
        ref={bannerRef}
        className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 md:py-24 rounded-b-3xl shadow-2xl mb-12 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImages[heroIndex]}')`, transition: 'background-image 0.7s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-0 transition-opacity duration-700" />
        <div className="flex-1 text-center md:text-left mb-8 md:mb-0 z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-white tracking-tighter leading-tight title-shadow">
            FORGE YOUR LEGACY
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-6 font-light max-w-xl mx-auto md:mx-0">
            Unleash your inner champion with premium gear engineered for greatness.
          </p>
          <div className="flex gap-4 mt-8 flex-col sm:flex-row justify-center md:justify-start">
            <Link to="/shop" className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 ease-in-out">
              Explore Collections
            </Link>
            <Link to="/shop" className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-600/70 transform hover:scale-105 transition-all duration-300 ease-in-out">
              New Arrivals
            </Link>
          </div>
        </div>
        {/* Slider Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((img, idx) => (
            <button
              key={img}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${heroIndex === idx ? 'bg-red-600 scale-125' : 'bg-gray-500/60'}`}
              onClick={() => setHeroIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 px-4 text-center tracking-wider uppercase">
          Shop by Category
        </h2>
        <div className="flex overflow-x-auto gap-6 px-4 pb-4 hide-scrollbar">
          {[
            { name: 'Hoodies', icon: <FaUserNinja size={32} /> },
            { name: 'T-Shirts', icon: <FaTshirt size={32} /> },
            { name: 'Gloves', icon: <FaHandRock size={32} /> },
            { name: 'Shorts', icon: <FaBoxOpen size={32} /> },
            { name: 'Hats', icon: <FaHatCowboy size={32} /> },
            { name: 'Accessories', icon: <FaShoppingBag size={32} /> },
          ].map((cat, i) => (
            <div
              key={cat.name}
              ref={el => (categoriesRef.current[i] = el)}
              className="flex flex-col items-center min-w-[120px] group cursor-pointer"
            >
              <div className="w-20 h-20 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center mb-3 shadow-lg transform group-hover:scale-110 group-hover:shadow-red-500/30 transition-all duration-300 ease-in-out">
                <div className="text-red-500 transform group-hover:scale-125 transition-transform duration-300">
                  {cat.icon}
                </div>
              </div>
              <span className="text-sm font-semibold text-white tracking-wide group-hover:text-red-400 transition-colors duration-300">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section - Responsive Grid */}
      <section className="mb-16 px-2">
        <h2 className="text-3xl font-extrabold text-white mb-8 uppercase tracking-wide text-center">Featured Products</h2>
        {loading ? (
          <div className="text-center text-zinc-400 py-12">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-zinc-400 py-12">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-gray-900/50 border-2 border-gray-800 rounded-2xl shadow-lg hover:shadow-red-500/40 hover:border-red-700/60 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                <div
                  className="relative w-full"
                  onClick={() => {
                    if (!user) {
                      navigate('/signin', { state: { redirectTo: `/product/${product._id || product.id}` } });
                    } else {
                      navigate(`/product/${product._id || product.id}`);
                    }
                  }}
                >
                  <img
                    src={product.image || product.imageUrl}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    FEATURED
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl text-white mb-2 truncate uppercase tracking-wider">
                    {product.name}
                  </h3>
                  <p className="text-red-500 font-bold text-2xl mb-4">${product.price}</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <button
                      className="w-full bg-red-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                    onClick={() => {
                      if (!user) {
                        navigate('/signin', { state: { addToCart: product, redirectTo: '/' } });
                      } else {
                        addToCart(product);
                        setToast(`${product.name} added to cart`);
                        setTimeout(() => setToast(''), 2000);
                      }
                    }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="w-full bg-gray-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
                    onClick={() => {
                      if (!user) {
                        navigate('/signin', { state: { buyNow: true, items: [{ ...product, quantity: 1 }], redirectTo: '/checkout' } });
                      } else {
                        setToast('Redirecting to checkout...');
                        setTimeout(() => setToast(''), 1500);
                        navigate('/checkout', { state: { buyNow: true, items: [{ ...product, quantity: 1 }] } });
                      }
                    }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* UFC Banner Image Section */}
      {/* Call to Action Section */}
      <section className="flex justify-center items-center my-16 px-4">
        <div
          className="w-full max-w-6xl rounded-2xl shadow-2xl border-2 border-gray-800 overflow-hidden text-center py-16 px-6 bg-cover bg-center"
          style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp8823375.jpg')" }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-4 title-shadow">JOIN THE ELITE</h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Sign up for exclusive offers, early access to new drops, and stories from the octagon.
            </p>
            <Link to="/signup" className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out">
              Become a Member
            </Link>
          </div>
        </div>
      </section>
      {/* Removed extra white section/div here to eliminate the white line */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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


export default Home;
