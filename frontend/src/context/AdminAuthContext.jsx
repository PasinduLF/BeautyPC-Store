import { createContext, useContext, useEffect, useState } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('beautypc_admin_token');
  });
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('beautypc_admin_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('beautypc_admin_token', token);
    } else {
      localStorage.removeItem('beautypc_admin_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('beautypc_admin_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('beautypc_admin_user');
    }
  }, [user]);

  const login = (payload) => {
    setToken(payload.token);
    setUser(payload.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ token, user, isAuthenticated: Boolean(token), login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

