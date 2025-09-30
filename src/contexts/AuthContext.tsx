import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  aadhaar?: string;
  phone?: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { aadhaar?: string; phone?: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: { aadhaar?: string; phone?: string }): Promise<boolean> => {
    // Mock authentication
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (credentials.aadhaar) {
        if (credentials.aadhaar.length === 12 && /^\d+$/.test(credentials.aadhaar)) {
          setUser({
            id: '1',
            aadhaar: credentials.aadhaar,
            name: 'User'
          });
          return true;
        }
      }
      
      if (credentials.phone) {
        if (credentials.phone.length === 10 && /^\d+$/.test(credentials.phone)) {
          setUser({
            id: '1',
            phone: credentials.phone,
            name: 'User'
          });
          return true;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};