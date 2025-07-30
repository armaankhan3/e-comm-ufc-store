import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CartModalRoot from './CartModalRoot';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';


// PrivateRoute for protecting routes
const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  const location = useLocation();
  return user ? element : <Navigate to="/signin" state={{ from: location }} replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* Remove /cart route, cart is now modal */}
          <Route path="/checkout" element={<PrivateRoute element={<Checkout />} />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminPanel />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CartModalRoot />
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
