import React, { createContext, useContext, useState, ReactNode } from 'react';
import { adminLogin } from '../adminApi';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return context;
};

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem('adminUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('adminToken'));

  const API_URL = "http://localhost:8000";

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const data = await adminLogin(username, password);
      setToken(data.access_token);
      localStorage.setItem('adminToken', data.access_token);
      // Fetch admin info
      const resp = await fetch(`${API_URL}/admin/me`, {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });
      if (!resp.ok) throw new Error('Failed to fetch admin info');
      const adminInfo = await resp.json();
      setAdmin(adminInfo);
      localStorage.setItem('adminUser', JSON.stringify(adminInfo));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}; 