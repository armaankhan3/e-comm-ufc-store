
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/photos/logo.png';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartDropdown from './cart/CartDropdown';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { cart, setCartOpen } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="px-6 py-4 bg-dark text-light flex justify-between items-center shadow-glass backdrop-blur-xl">
      <div className="flex items-center">
        <Link to="/" className="flex items-center font-bold text-2xl text-light hover:text-gray-300 transition-colors">
          <img className="h-20 filter invert brightness-900" src={logo} alt="Logo" />
        </Link>
      </div>
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6 relative">
        <Link to="/" className="text-light hover:text-gray-300 font-semibold">Home</Link>
        <button
          className="text-light hover:text-gray-300 font-semibold relative"
          onClick={() => setCartOpen(true)}
        >
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-accent text-dark text-xs px-2 py-1 rounded-full shadow-glass">
              {cart.length}
            </span>
          )}
        </button>
        {!user ? (
          <>
            <button
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 font-semibold transition"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 font-semibold transition"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-900 font-semibold">Hello, {user.name}</span>
            <button
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 font-semibold transition"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        )}
      </div>
      {/* Hamburger for mobile */}
      <div className="md:hidden flex items-center">
        <button
          className="text-accent text-3xl focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-dark border-t border-gray-800 z-50 p-6 flex flex-col gap-6 md:hidden">
          <Link to="/" className="text-light hover:text-gray-300 font-semibold" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <button
            className="text-light hover:text-gray-300 font-semibold relative text-left"
            onClick={() => setCartOpen(true)}
          >
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-accent text-dark text-xs px-2 py-1 rounded-full shadow-glass">
                {cart.length}
              </span>
            )}
          </button>
          {!user ? (
            <>
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 font-semibold transition"
                onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
              >
                Sign In
              </button>
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 font-semibold transition"
                onClick={() => { setMobileMenuOpen(false); navigate('/register'); }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-900 font-semibold">Hello, {user.name}</span>
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 font-semibold transition"
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
