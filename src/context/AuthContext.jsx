import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const[user, setUser] = useState(null);
    // Cargar la sesión desde localStorage al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "ADMIN") {
          setUser({ email: decoded.email, role: decoded.role, token });
        } else {
          logout(); // Si el usuario no es ADMIN, cerrar sesión
        }
      } catch (error) {
        console.error("Token inválido:", error);
        logout();
      }
    }
  }, []);

  // Función para iniciar sesión (Guarda en localStorage automáticamente)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("email", userData.email);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


