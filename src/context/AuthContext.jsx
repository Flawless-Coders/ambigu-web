import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserDetails, validateToken, fetchTheme } from "../modules/auth/services/AuthService";
import baseTheme from "../config/theme";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const[user, setUser] = useState(null);
  const [themeData, setThemeData] = useState(() => {
    const storedTheme = localStorage.getItem("themeData");
    return storedTheme ? JSON.parse(storedTheme) : baseTheme;
  });
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
          const theme = await fetchTheme(token);
          setUser({ email: decoded.sub, role: decoded.role, token, ...userDetails });
          setThemeData(theme);
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
    const theme = await fetchTheme(userData.token);

    setUser({...userData, ...userDetails});
    setThemeData(theme);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("themeData", JSON.stringify(theme));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("themeData");
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, themeData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


