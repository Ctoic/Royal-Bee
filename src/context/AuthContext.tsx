import React, { createContext, useContext, useState, ReactNode } from 'react';
import { googleLogout } from '@react-oauth/google';
import { registerUser, loginUser } from '../api';

interface User {
  id: number | string;
  email: string;
  name: string;
  joinDate: string;
  points: number;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  googleLogin: (profile: { sub: string; email: string; name: string }) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Restore user from localStorage if present
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const tokenData = await loginUser(email, password);
      setToken(tokenData.access_token);
      localStorage.setItem('token', tokenData.access_token);
      // Fetch user profile from backend
      const response = await fetch('http://127.0.0.1:8000/me', {
        headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const profile = await response.json();
      setUser(profile);
      localStorage.setItem('user', JSON.stringify(profile));
      return true;
    } catch (e) {
      return false;
    }
  };

  // Google login handler
  const googleLogin = (profile: { sub: string; email: string; name: string }) => {
    const googleUser: User = {
      id: profile.sub,
      email: profile.email,
      name: profile.name,
      joinDate: new Date().toISOString(),
      points: 0, // Initialize points for Google login
      role: 'customer' // Default role for Google login
    };
    setUser(googleUser);
    localStorage.setItem('user', JSON.stringify(googleUser));
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      await registerUser(email, name, password);
      return await login(email, password);
    } catch (e) {
    return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    googleLogout();
  };

  const refreshUser = async () => {
    if (!token) return;
    const response = await fetch('http://127.0.0.1:8000/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      const profile = await response.json();
      setUser(profile);
      localStorage.setItem('user', JSON.stringify(profile));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      googleLogin,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};