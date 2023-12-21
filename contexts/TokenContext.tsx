'use client'
import React, { createContext, useState, useContext } from 'react';

interface TokenContextType {
  isTokenExpired: boolean;
  setIsTokenExpired: (value: boolean) => void;
}

const TokenContext = createContext<TokenContextType | null>(null);

export const TokenProvider = ({ children }) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  return (
    <TokenContext.Provider value={{ isTokenExpired, setIsTokenExpired }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
