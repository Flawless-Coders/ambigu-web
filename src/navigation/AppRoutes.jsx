import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import PasswordRecoveryPage from "../modules/auth/pages/PasswordRecoveryPage"
import LoginPage from "../modules/auth/pages/LoginPage"
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage"
import Layout from "../views/Layout"
import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import ForgotPasswordPage from "../modules/auth/pages/ForgotPasswordPage"
import ProfilePage from "../modules/profile/pages/ProfilePage"
import LoaderAmbigu from "../kernel/LoaderAmbigu"
import WaitersPage from "../modules/waiters/pages/WaitersPage"
import TablePage from "../modules/tables/pages/TablePage"
import MenuPage from '../modules/menu/pages/MenuPage'
import CategoriesPage from "../modules/categories/pages/CategoriesPage"
import DishesPage from "../modules/dishes/pages/DishesPage"
import { ThemesPage } from "../modules/theming/pages/ThemesPage"
import OrderPublicPage from "../modules/public-order/pages/OrderPublicPage"
import ScoreServicePage from "../modules/public-order/pages/ScoreServicePage"
import PublicMenu from "../modules/public-menu/pages/PublicMenu"
import MenuDetails from "../modules/menu/pages/MenuDetails"
import OrderPage from "../modules/orders/pages/OrderPage"

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
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      "/": "Inicio",
      "/password-recovery": "Recuperar Contraseña",
      "/forgot-password": "Olvidé mi Contraseña",
      "/order-client/:token": "Cuenta",
      "/public-menu": "Menú",
      "/dashboard": "Dashboard",
      "/waiters": "Meseros",
      "/categories": "Categorías",
      "/dishes": "Platillos",
      "/tables": "Mesas",
      "/menu": "Menú",
      "/menu-details" : "Detalles de Menú",
      "/customization": "Personalización",
      "/orders": "Pedidos",
      "/profile": "Perfil",
      "/score-service/:token": "Calificar Servicio"
    };

    const matchRoute = (path) => {
      const dynamicPaths = Object.keys(routeTitles).filter(p => p.includes(':'));
      for (const dynamicPath of dynamicPaths) {
        const regex = new RegExp(`^${dynamicPath.replace(/:\w+/g, '\\w+')}$`);
        if (regex.test(path)) {
          return routeTitles[dynamicPath];
        }
      }
      return routeTitles[path];
    };

    const title = matchRoute(location.pathname) || "";
    document.title = `Ambigú | ${title}`;
  }, [location]); 

  if (loading) {
    return <LoaderAmbigu/>;
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/order-client/:token" element={<OrderPublicPage />} />
      <Route path="/order-client" element={<div style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',flexDirection: 'column',height: '100vh', fontSize:25}}>
        <img src="\assets\error-404.png" alt="not-found" style={{width:280}}/>
        Página no encontrada</div>} />
        <Route path="/score-service" element={<div style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',flexDirection: 'column',height: '100vh', fontSize:25}}>
        <img src="\assets\error-404.png" alt="not-found" style={{width:280}}/>
        Página no encontrada</div>} />
      <Route path="/score-service/:token" element={<ScoreServicePage />} />
      <Route path="/public-menu" element={<PublicMenu />} />
      
      {/* Rutas protegidas bajo Layout */}
      <Route element={
        <ProtectedRoute>
          <Layout onLogout={logout} />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/waiters" element={<WaitersPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/dishes" element={<DishesPage/>} />
        <Route path="/tables" element={<TablePage />} />
        <Route path="/menu" element={<MenuPage/>} />
        <Route path="/customization" element={<ThemesPage />} />
        <Route path="menu-details" element={<MenuDetails/>}/>
        <Route path="/orders" element={<OrderPage/>}/>
        <Route path="/profile" element={<ProfilePage/>} />
      </Route>
      
      {/* Redirección si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;