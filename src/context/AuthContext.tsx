import React, { createContext, useContext, useState, ReactNode } from 'react';
import { googleLogout } from '@react-oauth/google';

interface User {
  id: string;
  email: string;
  name: string;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  googleLogin: (profile: { sub: string; email: string; name: string }) => void;
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

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        joinDate: new Date().toISOString()
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  // Google login handler
  const googleLogin = (profile: { sub: string; email: string; name: string }) => {
    const googleUser: User = {
      id: profile.sub,
      email: profile.email,
      name: profile.name,
      joinDate: new Date().toISOString()
    };
    setUser(googleUser);
    localStorage.setItem('user', JSON.stringify(googleUser));
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration - in real app, this would call an API
    if (email && password && name) {
      const mockUser: User = {
        id: '1',
        email,
        name,
        joinDate: new Date().toISOString()
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    googleLogout();
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      googleLogin // add googleLogin to context
    }}>
      {children}
    </AuthContext.Provider>
  );
};