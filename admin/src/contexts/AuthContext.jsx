import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      if (response.status === 200) {
        const { user, token } = response.data;
        setUser(user);
        Cookies.set('jwt', token, { expires: 1 / 12, path: '/' }); // expires em 2hrs
        sessionStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      throw new Error('Erro ao fazer login');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      Cookies.remove('jwt');
      sessionStorage.removeItem('user');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }

  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('jwt');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get('/validateToken', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
      } catch (error) {
        console.error('Erro ao verificar o token:', error);
        Cookies.remove('jwt');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};