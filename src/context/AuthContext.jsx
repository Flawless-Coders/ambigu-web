import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { validateToken } from "../modules/auth/services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const[user, setUser] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const isValid = await validateToken(token);
        if (!isValid) {
          logout();
          return;
        }

        const decoded = jwtDecode(token);
        if (decoded.role === "ADMIN") {
          setUser({ email: decoded.sub, role: decoded.role, token });
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error al validar el token:", error);
        logout();
      }
    };

    checkAuth(); 
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("email", userData.email);
  };

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


