// frontend/src/auth/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setAuthToken(token);
    if (token) {
      // optionally decode token to set user info; we'll just set a minimal state
      setUser({ token });
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = async ({ username, password }) => {
    const res = await api.post('/auth/login', { username, password });
    setToken(res.data.token);
    return res.data;
  };

  const logout = () => setToken(null);

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
