// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Inicialización diferida (lazy): lee localStorage al crear el estado
  const [token, setToken] = useState(() => {
    return localStorage.getItem('fitadapt_token') || null;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('fitadapt_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (tokenData, userData) => {
    setToken(tokenData);
    setUser(userData);
    localStorage.setItem('fitadapt_token', tokenData);
    localStorage.setItem('fitadapt_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('fitadapt_token');
    localStorage.removeItem('fitadapt_user');
  };

  const actualizarUsuario = (updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('fitadapt_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuth: !!token, actualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// src/context/AuthContext.jsx
// ... (todo tu código anterior de AuthProvider se queda exactamente igual)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);