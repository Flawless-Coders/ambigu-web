import { Routes, Route, Navigate } from "react-router-dom"
import PasswordRecoveryPage from "../modules/auth/pages/PasswordRecoveryPage"
import LoginPage from "../modules/auth/pages/LoginPage"
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage"
import Layout from "../views/Layout"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import ForgotPasswordPage from "../modules/auth/pages/ForgotPasswordPage"
import ProfilePage from "../modules/profile/pages/ProfilePage"
import LoaderAmbigu from "../kernel/LoaderAmbigu"
import WaitersPage from "../modules/waiters/pages/WaitersPage"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return <LoaderAmbigu/>;
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Rutas protegidas bajo Layout */}
      <Route element={
        <ProtectedRoute>
          <Layout onLogout={logout} />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/waiters" element={<WaitersPage />} />
        <Route path="/categories" element={<div>Categorías (Coming Soon)</div>} />
        <Route path="/dishes" element={<div>Platillos (Coming Soon)</div>} />
        <Route path="/tables" element={<div>Mesas (Coming Soon)</div>} />
        <Route path="/menu" element={<div>Menú (Coming Soon)</div>} />
        <Route path="/customization" element={<div>Personalización (Coming Soon)</div>} />
        <Route path="/orders" element={<div>Pedidos (Coming Soon)</div>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Route>
      
      {/* Redirección si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;