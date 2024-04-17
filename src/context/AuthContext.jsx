// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Intentar cargar el usuario desde localStorage al iniciarse el contexto
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuth, setIsAuth] = useState(false);

  const login = (userData) => {
    // Configura el usuario en el estado de React
    setUser(userData);
    setIsAuth(true);
    // Guardar el usuario en localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    // Limpiar el usuario del estado de React
    setUser(null);
    setIsAuth(false);
    // Eliminar el usuario de localStorage
    localStorage.removeItem('user');
  };

  // Asegurarse de mantener el estado del usuario actualizado con localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
