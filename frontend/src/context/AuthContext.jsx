import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on load
  useEffect(() => {
    const storedUser = localStorage.getItem('dsabuds_user');
    const token = localStorage.getItem('dsabuds_token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.message || 'Login failed');
    
    localStorage.setItem('dsabuds_token', data.token);
    localStorage.setItem('dsabuds_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const signup = async (username, email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.message || 'Signup failed');
    
    localStorage.setItem('dsabuds_token', data.token);
    localStorage.setItem('dsabuds_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('dsabuds_token');
    localStorage.removeItem('dsabuds_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
