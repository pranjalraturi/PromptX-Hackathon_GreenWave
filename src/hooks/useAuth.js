import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';

const useAuth = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      const user = await authService.login(credentials);
      setUser(user);
    } catch (err) {
      setError(err.message);
    }
  };

  const register = async (userData) => {
    try {
      const user = await authService.register(userData);
      setUser(user);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await authService.getCurrentUser();
        setUser(user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [setUser]);

  return { login, register, logout, loading, error };
};

export default useAuth;