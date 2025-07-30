import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Real login: set user from backend response
  const signIn = (email, password, userObj, token) => {
    setUser(userObj);
    if (token) {
      localStorage.setItem('token', token);
    }
    return true;
  };

  // Real registration: call backend and store user/token
  const signUp = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.token) localStorage.setItem('token', data.token);
      return true;
    } catch (err) {
      throw err;
    }
  };


  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Alias for Navbar compatibility
  const logout = signOut;

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
