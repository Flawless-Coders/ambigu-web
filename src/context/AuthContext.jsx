import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserDetails, validateToken } from "../modules/auth/services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const[user, setUser] = useState(null);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token){
        setLoading(false);
        return;
      }

      try {
        const isValid = await validateToken(token);
        if (!isValid) {
          logout();
          return;
        }

        const decoded = jwtDecode(token);
        if (decoded.role === "ADMIN") {
          const userDetails = await getUserDetails(decoded.sub, token);
          setUser({ email: decoded.sub, role: decoded.role, token, ...userDetails });
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error al validar el token:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth(); 
  }, []);

  const login = async (userData) => {
    const userDetails = await getUserDetails(userData.email, userData.token);
    setUser({...userData, ...userDetails});
    localStorage.setItem("token", userData.token);
    localStorage.setItem("email", userData.email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


