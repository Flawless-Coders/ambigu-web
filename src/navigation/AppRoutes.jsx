import { Routes, Route, Navigate } from "react-router-dom"
import PasswordRecoveryPage from "../modules/auth/pages/PasswordRecoveryPage"
import LoginPage from "../modules/auth/pages/LoginPage"
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage"
import Layout from "../views/Layout"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
      
      {/* Rutas protegidas bajo Layout */}
      <Route element={
        <ProtectedRoute>
          <Layout onLogout={logout} />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/waiters" element={<div>Meseros (Coming Soon)</div>} />
        <Route path="/categories" element={<div>Categorías (Coming Soon)</div>} />
        <Route path="/dishes" element={<div>Platillos (Coming Soon)</div>} />
        <Route path="/tables" element={<div>Mesas (Coming Soon)</div>} />
        <Route path="/menu" element={<div>Menú (Coming Soon)</div>} />
        <Route path="/customization" element={<div>Personalización (Coming Soon)</div>} />
        <Route path="/orders" element={<div>Pedidos (Coming Soon)</div>} />
        <Route path="/profile" element={<div>Perfil (Coming Soon)</div>} />
      </Route>
      
      {/* Redirección si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;