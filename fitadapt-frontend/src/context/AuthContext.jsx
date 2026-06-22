import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);   // { idUsuario, nombre, hasProfile }
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('fitadapt_token');
    const savedUser  = localStorage.getItem('fitadapt_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

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

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);